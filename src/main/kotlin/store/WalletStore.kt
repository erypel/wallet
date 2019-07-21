package store

import dao.Users
import dao.Wallet
import dao.WalletDao
import dao.Wallets
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.sql.transactions.transaction

class WalletStore {
    fun create(wallet: Wallet, ownerId: Int): WalletDao {
        return transaction {
            WalletDao.new {
                publicKey = wallet.publicKey
                privateKey = wallet.privateKey
                userId = EntityID(ownerId, Users)
            }
        }
    }

    fun getWalletsForUser(userId: Int): List<Wallet> {
        return transaction {
            val wallets = WalletDao.find { Wallets.userId eq userId }
            wallets.map { it.toModel() }
        }
    }
}