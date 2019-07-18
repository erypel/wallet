package dao
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

class User(id: EntityID<Int>) : IntEntity(id) {
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