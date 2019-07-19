package dao
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

data class UserModel(
    var firstName: String,
    var lastName: String,
    var username: String,
    var password: String,
    var email: String
)

class User(id: EntityID<Int>) : IntEntity(id) {
    fun asModel(): UserModel? {
        return UserModel(
            this.firstName,
            this.lastName,
            this.username,
            this.password,
            this.email
        )
    }

    companion object : IntEntityClass<User>(Users)
    var firstName by Users.firstName
    var lastName by Users.lastName
    var username by Users.username
    var password by Users.password
    var email by Users.email
}

object Users: IntIdTable() {
    val firstName = varchar("firstname", 50)
    val lastName = varchar("lastname", 50)
    val username = varchar("username", 50)
    val password = varchar("password", 50)
    val email = varchar("email", 50)
}