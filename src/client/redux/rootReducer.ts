import { combineReducers } from 'redux'
import { reducer as alertReducer } from './store/AlertStore'
import { reducer as loginReducer } from './store/LoginStore'
import { reducer as txReducer } from './store/TransactionStore'
import userReducer from './store/user/reducer'
import { reducer as walletReducer } from './store/WalletStore'
import { UserState } from './store/user/types';

export interface AppState {
    user: UserState
}

export default combineReducers({
    alertReducer,
    loginReducer,
    txReducer,
    userReducer,
    walletReducer
})