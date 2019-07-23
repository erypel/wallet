package service

import api.UserApi
import dao.UserModel
import io.javalin.http.Context
import store.UserStore
import java.lang.Exception

//TODO some sort of handler should go above this to pull context out
class UserController(private val userStore: UserStore) : UserApi {
    override fun create(ctx: Context) {
        val user = ctx.body<UserModel>() //todo should get its own helper method
        // want usernames store in lowercase
        val username = user.username.toLowerCase()
        if(!userStore.isUsernameUnique(username)) {
            throw Exception("username already exists")
        }
        user.username = username
        userStore.create(user)
        ctx.json({})
    }
}