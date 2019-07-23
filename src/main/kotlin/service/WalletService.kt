package service

import dao.Wallet
import store.WalletStore


class WalletService(private val walletStore: WalletStore) {
    fun getWalletsForUser(userId: String): List<Wallet> {
        return walletStore.getWalletsForUser(userId.toInt())
    }

    fun create(wallet: Wallet): Wallet {
        return walletStore.create(wallet)
    }

}