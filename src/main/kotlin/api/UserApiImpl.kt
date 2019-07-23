package api

import dao.UserModel
import io.javalin.http.Context
import service.UserService

class UserApiImpl(private val userService: UserService) : UserApi {
    override fun create(ctx: Context) {
        val user = ctx.body<UserModel>()
        ctx.json(userService.create(user))
    }

}