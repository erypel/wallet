import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import controller.LoginController
import controller.UserController
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.Javalin
import io.javalin.plugin.json.JavalinJackson
import org.jetbrains.exposed.sql.Database
import store.UserStore

fun main(args: Array<String>) {

    val app = Javalin.create{config ->
        config.enableCorsForAllOrigins()
        config.accessManager(AccessManager::accessManager)
    }.apply {
        exception(Exception::class.java) { e, _ -> e.printStackTrace() }
        error(404) { ctx -> ctx.json("not found") }
    }.start(7000)

    JavalinJackson.configure(jacksonObjectMapper().findAndRegisterModules())

    //TODO these should go in a config file somewhere
    val hostName = "localhost"
    val dbName = "walletdb"
    val dbUsername = "root"
    val dbPassword = "password"
    Database.connect("jdbc:mysql://$hostName:3306/$dbName?useSSL=false", driver = "com.mysql.cj.jdbc.Driver",
                    user = dbUsername, password = dbPassword)

    val userStore = UserStore()
    val userApi = UserController(userStore)
    val loginApi = LoginController(userStore)

    app.routes {
        path("user") {
            path("login") {
                post(loginApi::login)
            }
            path("create") {
                post(userApi::create)
            }
        }
        get("/") { ctx -> ctx.result("Hello World") }

//        post("/logout") { ctx ->
//
//        }
    }
}