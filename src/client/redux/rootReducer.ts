import { combineReducers } from 'redux'
import { reducer as alertReducer } from './store/AlertStore'
import { reducer as loginReducer } from './store/LoginStore'
import { reducer as txReducer } from './store/TransactionStore'
import { reducer as userReducer } from './store/UserStore'
import { reducer as walletReducer } from './store/WalletStore'

export default combineReducers({
    alertReducer,
    loginReducer,
    txReducer,
    userReducer,
    walletReducer
})