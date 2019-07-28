package service

import dao.Login
import dao.User
import io.javalin.http.Context
import store.UserStore
import java.lang.Exception
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import CookieBuilder
import UnexpectedStateException
import dao.NewUser
import dao.UserDetail

class UserService(private val userStore: UserStore) {
    fun create(user: NewUser): User {
        // want usernames store in lowercase
        val username = user.username.toLowerCase()
        if(!userStore.isUsernameUnique(username)) {
            throw Exception("username already exists")
        }
        user.username = username
        return createNewUser(user)
    }

    fun update(detail: UserDetail) {
        return userStore.update(detail)
    }

    //TODO want to think more about how to architect this
    fun login(ctx: Context) {
        val login = ctx.body<Login>()
        val authenticated = authenticate(login)?: throw IllegalArgumentException("Error logging in")
        val sessionId = ctx.req.session.id ?: throw UnexpectedStateException("session id is null")
        ctx.sessionAttribute("logged-in-user", login.username)
        ctx.json(authenticated)
        val cookieBuilder = CookieBuilder()
        ctx.res.setHeader("Set-Cookie", cookieBuilder.create(sessionId))
        ctx
    }

    private fun createNewUser(user: NewUser): User {
        val createdUser = userStore.createUser(user)
        userStore.createUserDetail(user.salt, createdUser.id!!)
        return createdUser
    }

    private fun authenticate(login: Login): Pair<User, UserDetail>? {
        val user = userStore.findUserByUsername(login.username)?: return null
        val userId = user.id.value
        val detail = userStore.getUserDetail(userId)
        var salt = detail.salt!!
        return if(user.password == generateHashWithHmac512(login.password, salt)) {
            Pair(user.toUser(), detail)
        } else {
            null
        }
    }

    private fun generateHashWithHmac512(message: String, key: String): String {
        try {
            val hashingAlgorithm = "HmacSHA512"
            val bytes = hmac(hashingAlgorithm, key.toByteArray(), message.toByteArray())
                    ?: throw Exception("uh oh!")
            return bytesToHex(bytes)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return ""
    }

    private fun hmac(algorithm: String, key: ByteArray, message: ByteArray): ByteArray? {
        try {
            val mac = Mac.getInstance(algorithm)
            mac.init(SecretKeySpec(key, algorithm))
            return mac.doFinal(message)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return null
    }

    private fun bytesToHex(bytes: ByteArray): String {
        val hexArray = "0123456789abcdef".toCharArray()
        val hexChars = CharArray(bytes.size * 2)
        var j = 0
        var v: Int
        while (j < bytes.size) {
            val byte = bytes[j]
            v = (byte.toInt() and 0xFF)
            hexChars[j * 2] = hexArray[v.ushr(4)]
            hexChars[j * 2 + 1] = hexArray[v and 0x0F]
            j++
        }
        return String(hexChars)
    }
}