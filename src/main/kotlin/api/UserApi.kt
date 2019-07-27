package api
import io.javalin.http.Context

interface UserApi {
    fun create(ctx: Context)
    fun login(ctx: Context)
    fun logout(ctx: Context)
    fun update(ctx: Context)
}