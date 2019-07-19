import org.eclipse.jetty.server.session.DatabaseAdaptor
import org.eclipse.jetty.server.session.DefaultSessionCache
import org.eclipse.jetty.server.session.JDBCSessionDataStoreFactory
import org.eclipse.jetty.server.session.SessionHandler

fun sqlSessionHandler(driver: String, url: String) = SessionHandler().apply {
    sessionCache = DefaultSessionCache(this).apply {
        sessionDataStore = JDBCSessionDataStoreFactory().apply {
            setDatabaseAdaptor(DatabaseAdaptor().apply {
                setDriverInfo(driver, url)
            })
        }.getSessionDataStore(sessionHandler)
    }
    httpOnly = true
    // make additional changes to your SessionHandler here
}