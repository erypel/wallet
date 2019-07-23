package dao
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

data class User(
    var firstName: String,
    var lastName: String,
    var username: String,
    var password: String,
    var salt: String,
    var email: String,
    var id: Int?
)

data class Login(
        var username: String,
        var password: String
)

class UserDao(id: EntityID<Int>) : IntEntity(id) {
    fun toUser(): User {
        return User(
            this.firstName,
            this.lastName,
            this.username,
            this.password,
            this.salt,
            this.email,
            this.id.value
        )
    }

    companion object : IntEntityClass<UserDao>(Users)
    var firstName by Users.firstName
    var lastName by Users.lastName
    var username by Users.username
    var password by Users.password
    var salt by Users.salt
    var email by Users.email
}

object Users: IntIdTable() {
    val firstName = varchar("firstname", 50)
    val lastName = varchar("lastname", 50)
    val username = varchar("username", 50)
    val password = varchar("password", 225)
    val salt = varchar("salt", 225)
    val email = varchar("email", 50)
}