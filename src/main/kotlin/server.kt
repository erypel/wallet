import controller.LoginController
import dao.Login
import dao.Logins
import dao.User
import dao.Users
import io.javalin.apibuilder.ApiBuilder.*
import io.javalin.Javalin
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction

fun main(args: Array<String>) {

    val app = Javalin.create().apply {
        exception(Exception::class.java) { e, ctx -> e.printStackTrace() }
        error(404) { ctx -> ctx.json("not found") }
    }.start(7000)

    Database.connect("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1", driver = "org.h2.Driver")

    transaction {
        // print sql to std-out
        addLogger(StdOutSqlLogger)

        SchemaUtils.create (Users)

        val dummyUser = User.new {
            name = "admin"
            email = "email@email.com"
        }

        println("Users: ${User.all()}")

        SchemaUtils.create (Logins)

        Login.new {
            username = "admin"
            password = "password"
            user = dummyUser
        }

        println("Logins: ${Login.all()}")
    }

    app.routes {
        app.get("/") { ctx -> ctx.result("Hello World") }
        get("/login") { ctx ->
            val controller = LoginController()
            ctx.result(controller.login(ctx).email)
        }

        post("/logout") { ctx ->

        }
    }

}

object Cities: IntIdTable() {
    val name = varchar("name", 50)
}

class City(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<City>(Cities)

    var name by Cities.name
}