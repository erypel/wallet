import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore =  () => {
  let store = createStore(persistedReducer, undefined, applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore