package dao

import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

data class WalletDTO(
        var privateKey: String,
        var publicKey: String,
        var userId: Int
) {
    fun toWallet(): Wallet {
        return Wallet(this.privateKey, this.publicKey, this.userId)
    }
}

data class Wallet(
        var privateKey: String,
        var publicKey: String,
        var userId: Int
)

class WalletDao(id: EntityID<Int>): IntEntity(id) {
    companion object : IntEntityClass<WalletDao>(Wallets)

    var privateKey by Wallets.privateKey
    var publicKey by Wallets.publicKey
    var userId by Wallets.userId

    fun toModel(): Wallet {
        return Wallet(
                this.privateKey,
                this.publicKey,
                this.userId
        )
    }
}

object Wallets: IntIdTable() {
    val privateKey = varchar("privateKey", 511)
    val publicKey = varchar("publicKey", 511)
    val userId = integer("userId").references(Users.id)
}