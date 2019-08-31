package api

import dao.WalletDTO
import io.javalin.http.Context
import service.WalletService

class WalletApiImpl(private val walletService: WalletService) : WalletApi {
    override fun getWalletsForUser(ctx: Context) {
        val userId = ctx.pathParam("userId")
        ctx.json(walletService.getWalletsForUser(userId))
    }

    override fun create(ctx: Context) {
        val wallet = ctx.body<WalletDTO>().toWallet()
        ctx.json(walletService.create(wallet))
    }

    override fun delete(ctx: Context) {
        val privateKey = ctx.pathParam("userId")
        ctx.json(walletService.delete(privateKey))
    }
}