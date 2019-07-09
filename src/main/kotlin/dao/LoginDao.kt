package dao

import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

class Login(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<Login>(Logins)

    var username by Logins.username
    var password by Logins.password
    var user by User referencedOn Logins.user

}

//TODO obviously this isn't a good idea for security
object Logins: IntIdTable() {
    val username = varchar("username", 20)
    val password = varchar("password", 50)
    val user = reference("user", Users)
}