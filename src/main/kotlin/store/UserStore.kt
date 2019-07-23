package store

import dao.UserDao
import dao.User
import dao.Users
import org.jetbrains.exposed.sql.transactions.transaction

class UserStore {
    fun findUserByUsername(username: String): UserDao? {
        return transaction {
            val users = UserDao.find { Users.username eq username }
            users.firstOrNull()
        }
    }

    fun isUsernameUnique(username: String): Boolean {
        return findUserByUsername(username) == null
    }

    fun create(user: User): User {
        return transaction {
            UserDao.new {
                firstName = user.firstName
                lastName = user.lastName
                username = user.username
                password = user.password
                salt = user.salt
                email = user.email
            }.toUser()
        }
    }
}