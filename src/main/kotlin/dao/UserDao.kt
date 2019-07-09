package dao
import java.util.concurrent.atomic.AtomicInteger
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

class User(id: EntityID<Int>) : IntEntity(id) {
    companion object : IntEntityClass<User>(Users)

    var name by Users.name
    var email by Users.email
}

object Users: IntIdTable() {
    val name = varchar("name", 50)
    val email = varchar("email", 50)
}