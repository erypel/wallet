import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import controller.LoginController
import controller.UserController
import controller.WalletController
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.Javalin
import io.javalin.plugin.json.JavalinJackson
import org.jetbrains.exposed.sql.Database
import store.UserStore
import store.WalletStore

fun main(args: Array<String>) {
    //TODO these should go in a config file somewhere
    val hostName = "localhost"
    val dbName = "walletdb"
    val dbUsername = "root"
    val dbPassword = "password"
    val driver = "com.mysql.cj.jdbc.Driver"
    val dbUrl = "jdbc:mysql://$hostName:3306/$dbName?useSSL=false&DATABASE_TO_UPPER=false"
    Database.connect(dbUrl, driver,
            user = dbUsername, password = dbPassword)

    val app = Javalin.create{config ->
        config.enableCorsForAllOrigins()
        config.accessManager(AccessManager::accessManager)
        config.sessionHandler{ sqlSessionHandler(driver, "jdbc:mysql://$dbUsername:$dbPassword@$hostName:3306/$dbName") }
    }.apply {
        exception(Exception::class.java) { e, _ -> e.printStackTrace() }
        error(404) { ctx -> ctx.json("not found") }
    }.start(7000)

    JavalinJackson.configure(jacksonObjectMapper().findAndRegisterModules())

    val userStore = UserStore()
    val walletStore = WalletStore()
    val userApi = UserController(userStore)
    val loginApi = LoginController(userStore)
    val walletApi = WalletController(walletStore)

    app.routes {
        path("user") {
            path("login") {
                post(loginApi::login)
            }
            path("create") {
                post(userApi::create)
            }
        }
        path("wallet") {
            path("create") {
                post(walletApi::create)
            }
            path(":userId") {
                get(walletApi::getWalletsForUser)
            }
        }
        get("/") { ctx -> ctx.result("Hello World") }

//        post("/logout") { ctx ->
//
//        }
    }
}