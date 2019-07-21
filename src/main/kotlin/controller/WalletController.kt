package controller

import api.WalletApi
import dao.Wallet
import io.javalin.http.Context
import store.WalletStore

//TODO some sort of handler should go above this to pull context out
class WalletController(private val walletStore: WalletStore): WalletApi {
    override fun getWalletsForUser(userId: Int): List<Wallet> {
        return walletStore.getWalletsForUser(userId)
    }

    override fun create(ctx: Context) {
        val wallet = ctx.body<Wallet>()
        val userId = ctx.pathParam("userId")
        val newWallet = walletStore.create(wallet, userId as Int)
        ctx.json(newWallet.toModel())
    }

}