import io.javalin.core.security.Role
import io.javalin.http.Context
import io.javalin.http.Handler

object AccessManager {
    fun accessManager(handler: Handler, ctx: Context, permittedRoles: Set<Role>) {
        return handler.handle(ctx)
//        when {
//            permittedRoles.contains(Roles.ANYONE) -> handler.handle(ctx)
//            //ctx.userRoles.any { it in permittedRoles } -> handler.handle(ctx)
//            else -> ctx.status(401).json("Unauthorized")
//        }
    }

    // TODO need to implement when there are more roles
//    private val Context.userRoles: Any
//        get() this.basicAuthCredentials()?.let { (username, password) ->
//        userRoleMap[Pair(username, password)] ?: setOf()
//    } ?: setOf()
}