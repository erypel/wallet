package controller

import dao.Login
import dao.Logins
import dao.User
import io.javalin.http.Context
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction

class LoginController {
    fun login(ctx: Context): User {
        //val login = ctx.body<Login>()
        return transaction {
            val username = "admin"
            val password = "password"

            val account = Login.find {
                (Logins.username eq username) and (Logins.password eq password)
            }

            account.first().user
        }
    }
}