package store

import dao.Wallet
import dao.WalletDao
import dao.Wallets
import org.jetbrains.exposed.sql.transactions.transaction

class WalletStore {
    fun create(wallet: Wallet): Wallet {
        return transaction {
            WalletDao.new {
                publicKey = wallet.publicKey
                privateKey = wallet.privateKey
                userId = wallet.userId
            }.toModel()
        }
    }

    fun getWalletsForUser(userId: Int): Map<String, Wallet> {
        return transaction {
            val wallets = WalletDao.find { Wallets.userId eq userId }
            wallets.associateBy({it.publicKey}, {it.toModel()})
        }
    }
}