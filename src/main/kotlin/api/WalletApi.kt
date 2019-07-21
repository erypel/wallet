package api

import dao.Wallet
import io.javalin.http.Context

interface WalletApi {
    fun create(ctx: Context)
    fun getWalletsForUser(userId: Int): List<Wallet>
}