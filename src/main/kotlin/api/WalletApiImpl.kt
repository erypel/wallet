package api

import dao.Wallet
import io.javalin.http.Context
import service.WalletService

class WalletApiImpl(private val walletService: WalletService) : WalletApi {
    override fun getWalletsForUser(ctx: Context) {
        val userId = ctx.pathParam("userId")
        ctx.json(walletService.getWalletsForUser(userId))
    }

    override fun create(ctx: Context) {
        val wallet = ctx.body<Wallet>()
        ctx.json(walletService.create(wallet))
    }
}