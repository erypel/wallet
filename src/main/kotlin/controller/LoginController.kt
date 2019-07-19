package controller

import dao.LoginModel
import dao.UserModel
import io.javalin.http.Context
import store.UserStore
import javax.crypto.spec.SecretKeySpec
import javax.crypto.Mac

class LoginController(private val userStore: UserStore) {
    fun login(ctx: Context): UserModel {
        val login = ctx.body<LoginModel>()
        return authenticate(login)?: throw Exception("Error logging in")
    }

    private fun authenticate(login: LoginModel): UserModel? {
        val user = userStore.findUserByUsername(login.username)?: throw Exception("Login failed")
        return if(user.password == generateHashWithHmac512(login.password, user.salt)) {
            user.asModel()
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