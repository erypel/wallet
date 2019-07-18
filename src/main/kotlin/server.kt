import controller.LoginController
import controller.UserController
import dao.Login
import dao.Logins
import dao.User
import dao.Users
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.Javalin
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction
import store.UserStore

fun main(args: Array<String>) {

    val app = Javalin.create().apply {
        exception(Exception::class.java) { e, ctx -> e.printStackTrace() }
        error(404) { ctx -> ctx.json("not found") }
    }.start(7000)

    //TODO these should go in a config file somewhere
    val hostName = "localhost"
    val dbName = "walletdb"
    val dbUsername = "root"
    val dbPassword = "password"
    Database.connect("jdbc:mysql://$hostName:3306/$dbName?useSSL=false", driver = "com.mysql.cj.jdbc.Driver",
                    user = dbUsername, password = dbPassword)
    // uncomment to add initial user
//    transaction {
//        // print sql to std-out
//        addLogger(StdOutSqlLogger)
//
//        val dummyUser = User.new {
//            name = "admin"
//            email = "email@email.com"
//        }
//
//        println("Users: ${User.all()}")
//
//        Login.new {
//            username = "admin"
//            password = "password"
//            user = dummyUser
//        }
//
//        println("Logins: ${Login.all()}")
//    }

    val userStore = UserStore()
    val userApi = UserController(userStore)


    app.routes {
        app.get("/") { ctx -> ctx.result("Hello World") }
        get("/login") { ctx ->
            val controller = LoginController()
            ctx.result(controller.login(ctx).email)
        }

        post("/logout") { ctx ->

        }
        path("/user") {
            post("/create") { ctx ->
                userApi.create(ctx)
                ctx.status(200)
            }
        }
    }
}