package api

import dao.User
import io.javalin.http.Context
import service.UserService
import java.lang.Exception

class UserApiImpl(private val userService: UserService) : UserApi {
    override fun login(ctx: Context) {
        try {
            userService.login(ctx)
        } catch (e: Exception) {
            ctx
        }
    }

    override fun logout(ctx: Context) {
        ctx.req.session.invalidate()
    }

    override fun create(ctx: Context) {
        val user = ctx.body<User>()
        ctx.json(userService.create(user))
    }

}