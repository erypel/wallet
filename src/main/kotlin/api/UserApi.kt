package api
import io.javalin.http.Context

interface UserApi {
    fun create(ctx: Context)
}