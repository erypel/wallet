package service

import dao.Wallet
import store.WalletStore


class WalletService(private val walletStore: WalletStore) {
    fun getWalletsForUser(userId: String): Map<String, Wallet> {
        return walletStore.getWalletsForUser(userId.toInt())
    }

    fun create(wallet: Wallet): Wallet {
        return walletStore.create(wallet)
    }

    fun delete(privateKey: String) {
        return walletStore.delete(privateKey)
    }

}