class CookieBuilderTest {
    fun testCreate() {
        val cookieBuilder = CookieBuilder()
        val regex = Regex("[; ]'+ChocolateChip+'=([^\\s;]*)")
        val cookie = cookieBuilder.create("TestString")
        assert(regex.matches(cookie))
    }
}
