package controller

import api.WalletApi
import dao.Wallet
import io.javalin.http.Context
import store.WalletStore

//TODO some sort of handler should go above this to pull context out
class WalletController(private val walletStore: WalletStore): WalletApi {
    override fun getWalletsForUser(ctx: Context) {
        val userId = ctx.pathParam("userId")
        ctx.json(walletStore.getWalletsForUser(userId.toInt()))
    }

    override fun create(ctx: Context) {
        val wallet = ctx.body<Wallet>()
        walletStore.create(wallet)
        ctx.json(wallet)
    }

}