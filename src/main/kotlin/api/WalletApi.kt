package api

import io.javalin.http.Context

interface WalletApi {
    fun create(ctx: Context)
    fun getWalletsForUser(ctx: Context)
}