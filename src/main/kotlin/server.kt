import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import controller.UserController
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.Javalin
import io.javalin.plugin.json.JavalinJackson
import org.jetbrains.exposed.sql.Database
import store.UserStore

fun main(args: Array<String>) {

    val app = Javalin.create().apply {
        exception(Exception::class.java) { e, ctx -> e.printStackTrace() }
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

    data class User(val name: String, val email: String, val id: Int)
    val users = hashMapOf(
            0 to User(name = "Alice", email = "alice@alice.kt", id = 0),
            1 to User(name = "Bob", email = "bob@bob.kt", id = 1),
            2 to User(name = "Carol", email = "carol@carol.kt", id = 2),
            3 to User(name = "Dave", email = "dave@dave.kt", id = 3)
    )

    app.routes {
        get("/") { ctx -> ctx.result("Hello World") }
//        get("/login") { ctx ->
//            val controller = LoginController()
//            ctx.result(controller.login(ctx).email)
//        }
//
//        post("/logout") { ctx ->
//
//        }
        app.post("/user/create") { ctx ->
            print("server made it")
            userApi.create(ctx)
            ctx.json(users)
        }
    }
}