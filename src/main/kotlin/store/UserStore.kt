package store

import dao.*
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

    fun createUser(user: NewUser): User {
        return transaction {
            UserDao.new {
                username = user.username
                password = user.password
            }.toUser()
        }
    }

    fun createUserDetail(randomString: String, id: Int): UserDetail {
        return transaction {
            UserDetailDao.new {
                firstName = ""
                lastName = ""
                salt = randomString
                email = ""
                userId = id
            }.toUserDetail()
        }
    }
}