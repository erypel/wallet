import org.joda.time.DateTime

const val COOKIE_NAME = "ChocolateChip"

class CookieBuilder {
    private var cookie: String = ""

    fun create(sessionId: String): String {
        addSessionToken(sessionId)
        addMaxAge()
        addPath()
        return cookie
    }

    private fun addSessionToken(sessionId: String) {
        cookie = cookie.plus("$COOKIE_NAME=$sessionId; ")
    }

    private fun addMaxAge() {
        cookie = cookie.plus("Max-Age=${60 * 60}; ") // 60 minutes
    }

    private fun addPath() {
        cookie = cookie.plus("Path=/;")
    }
}