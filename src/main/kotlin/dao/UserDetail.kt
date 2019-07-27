package dao

import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

data class UserDetail(
        var firstName: String,
        var lastName: String,
        var salt: String,
        var email: String,
        var userId: Int
)

class UserDetailDao(id: EntityID<Int>) : IntEntity(id) {
    fun toUserDetail(): UserDetail {
        return UserDetail(
                this.firstName,
                this.lastName,
                this.salt,
                this.email,
                this.userId
        )
    }

    companion object : IntEntityClass<UserDetailDao>(UserDetails)
    var firstName by UserDetails.firstName
    var lastName by UserDetails.lastName
    var salt by UserDetails.salt
    var email by UserDetails.email
    var userId by UserDetails.userId
}

object UserDetails: IntIdTable() {
    val firstName = varchar("firstname", 50)
    val lastName = varchar("lastname", 50)
    val salt = varchar("salt", 225)
    val email = varchar("email", 50)
    val userId = integer("userId").references(Users.id)
}