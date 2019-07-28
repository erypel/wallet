package store

import dao.*
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update

class UserStore {
    fun findUserByUsername(username: String): UserDao? {
        return transaction {
            val users = UserDao.find { Users.username eq username }
            users.firstOrNull()
        }
    }

    fun getUserDetail(userId: Int): UserDetail {
        return transaction {
            UserDetailDao.findById(userId)!!.toUserDetail()
        }
    }

    fun update(detail: UserDetail) {
        transaction {
            UserDetails.update({UserDetails.userId eq detail.userId}) {
                it[firstName] = detail.firstName
                it[lastName] = detail.lastName
                it[email] = detail.email
            }
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