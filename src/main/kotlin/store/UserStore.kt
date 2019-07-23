package store

import dao.User
import dao.UserModel
import dao.Users
import org.jetbrains.exposed.sql.transactions.transaction

class UserStore {
    fun findUserByUsername(username: String): User? {
        return transaction {
            val users = User.find { Users.username eq username }
            users.firstOrNull()
        }
    }

    fun isUsernameUnique(username: String): Boolean {
        return findUserByUsername(username) == null
    }

    fun create(user: UserModel): UserModel {
        return transaction {
            User.new {
                firstName = user.firstName
                lastName = user.lastName
                username = user.username
                password = user.password
                salt = user.salt
                email = user.email
            }.asModel()
        }
    }
}