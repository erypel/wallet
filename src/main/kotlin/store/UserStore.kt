package store

import dao.User
import dao.Users
import org.jetbrains.exposed.sql.transactions.transaction

class UserStore {
    fun isUsernameUnique(username: String): Boolean {
        return transaction {
            val user = User.find { Users.username eq username }
            user == null
        }
    }

    fun create(user: User) {
        transaction {
            User.new { user }
        }
    }
}