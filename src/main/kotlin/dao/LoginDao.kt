package dao

import model.Login

class LoginDao {
    val logins = setOf(Login("admin", "password"))

    fun login(login: Login) {

    }

    fun validateLogin(login: Login): Boolean {
        return logins.contains(login)
    }
}