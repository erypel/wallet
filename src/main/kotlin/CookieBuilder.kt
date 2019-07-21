import org.joda.time.DateTime

const val COOKIE_NAME = "ChocolateChip"

class CookieBuilder {
    private val cookie: String = ""

    fun create(sessionId: String): String {
        addSessionToken(sessionId)
        addExpires()
        addPath()
        return cookie
    }

    private fun addSessionToken(sessionId: String) {
        cookie.plus("$COOKIE_NAME=$sessionId;")
    }

    private fun addExpires() {
        var dateTime = DateTime().plusMinutes(60)
        cookie.plus("Expires=$dateTime;")
    }

    private fun addPath() {
        cookie.plus("Path=/;")
    }
}