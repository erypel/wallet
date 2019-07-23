package service


import dao.UserModel
import store.UserStore
import java.lang.Exception

class UserService(private val userStore: UserStore) {
    fun create(user: UserModel): UserModel {
        // want usernames store in lowercase
        val username = user.username.toLowerCase()
        if(!userStore.isUsernameUnique(username)) {
            throw Exception("username already exists")
        }
        user.username = username
        return userStore.create(user)
    }
}