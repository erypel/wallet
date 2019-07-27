package api

import dao.NewUser
import dao.User
import dao.UserDetail
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
        val user = ctx.body<NewUser>()
        ctx.json(userService.create(user))
    }

    override fun update(ctx: Context) {
        val detail = ctx.body<UserDetail>()
        ctx.json(userService.update(detail))
    }
}