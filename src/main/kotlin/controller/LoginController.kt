package controller

import dao.LoginModel
import dao.UserModel
import io.javalin.http.Context
import store.UserStore

class LoginController(private val userStore: UserStore) {
    fun login(ctx: Context): UserModel {
        val login = ctx.body<LoginModel>()
        return authenticate(login)?: throw Exception("Error logging in")
    }

    private fun authenticate(login: LoginModel): UserModel? {
        val user = userStore.findUserByUsername(login.username)?: throw Exception("Login failed")
        return if(user.password == login.password) {
            user.asModel()
        } else {
            null
        }
    }
}