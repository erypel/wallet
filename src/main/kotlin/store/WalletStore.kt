package store

import dao.Wallet
import dao.WalletDao
import dao.Wallets
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction

class WalletStore {
    fun create(wallet: Wallet) {
        return transaction {
            Wallets.insert {
                it[publicKey] = wallet.publicKey
                it[privateKey] = wallet.privateKey
                it[userId] = wallet.userId
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