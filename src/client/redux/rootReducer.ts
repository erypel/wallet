import { combineReducers } from 'redux'
import { reducer as alertReducer } from './store/AlertStore'
import { reducer as txReducer } from './store/TransactionStore'
import userReducer from './store/user/reducer'
import loginReducer from './store/login/reducer'
import { reducer as walletReducer } from './store/WalletStore'
import { UserState } from './store/user/types';
import { LoginState } from './store/login/types';

export interface AppState {
    user: UserState
    login: LoginState
}

export default combineReducers({
    alertReducer,
    loginReducer,
    txReducer,
    userReducer,
    walletReducer
})