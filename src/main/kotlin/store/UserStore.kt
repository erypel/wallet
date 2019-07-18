package store

import dao.User
import dao.UserModel
import dao.Users
import org.jetbrains.exposed.sql.transactions.transaction

class UserStore {
    fun isUsernameUnique(username: String): Boolean {
        return transaction {
            val user = User.find { Users.username eq username }
            user.empty()
        }
    }

    fun create(user: UserModel) {
        transaction {
            User.new {
                firstName = user.firstName
                lastName = user.lastName
                username = user.username
                password = user.password
                email = user.email
            }
        }
    }
}