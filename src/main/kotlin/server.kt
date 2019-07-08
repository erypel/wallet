import model.User
import dao.UserDao
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

    Database.connect("jdbc:h2:mem:test", driver = "org.h2.Driver")

    transaction {
        // print sql to std-out
        addLogger(StdOutSqlLogger)

        SchemaUtils.create (Cities)

        // insert new city. SQL: INSERT INTO Cities (name) VALUES ('St. Petersburg')
        val stPete = City.new {
            name = "St. Petersburg"
        }

        // 'select *' SQL: SELECT Cities.id, Cities.name FROM Cities
        println("Cities: ${City.all()}")
    }

    val userDao = UserDao()

    val app = Javalin.create().apply {
        exception(Exception::class.java) { e, ctx -> e.printStackTrace() }
        error(404) { ctx -> ctx.json("not found") }
    }.start(7000)

    app.routes {
        post("/login") { ctx ->

        }

        post("/logout") { ctx ->

        }


        get("/users") { ctx ->
            ctx.json(userDao.users)
        }

        get("/users/:user-id") { ctx ->
            ctx.json(userDao.findById(ctx.pathParam("user-id").toInt())!!)
        }

        get("/users/email/:email") { ctx ->
            ctx.json(userDao.findByEmail(ctx.pathParam("email"))!!)
        }

        post("/users") { ctx ->
            val user = ctx.body<User>()
            userDao.save(name = user.name, email = user.email)
            ctx.status(201)
        }

        patch("/users/:user-id") { ctx ->
            val user = ctx.body<User>()
            userDao.update(
                    id = ctx.pathParam("user-id").toInt(),
                    user = user
            )
            ctx.status(204)
        }

        delete("/users/:user-id") { ctx ->
            userDao.delete(ctx.pathParam("user-id").toInt())
            ctx.status(204)
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