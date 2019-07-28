package dao
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

data class User(
    var username: String,
    var password: String,
    var id: Int?
)

data class NewUser(
        var username: String,
        var password: String,
        var salt: String,
        var id: Int?
)

data class Login(
        var username: String,
        var password: String
)

class UserDao(id: EntityID<Int>) : IntEntity(id) {
    fun toUser(): User {
        return User(
            this.username,
            this.password,
            this.id.value
        )
    }

    companion object : IntEntityClass<UserDao>(Users)
    var username by Users.username
    var password by Users.password
}

object Users: IntIdTable() {
    val username = varchar("username", 50)
    val password = varchar("password", 225)
}