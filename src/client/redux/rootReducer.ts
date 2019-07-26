import { combineReducers } from 'redux'
import { reducer as alertReducer } from './store/AlertStore'
import { reducer as txReducer } from './store/TransactionStore'
import user from './store/user/reducer'
import login from './store/login/reducer'
import wallet from './store/wallet/reducer'
import { UserState } from './store/user/types';
import { LoginState } from './store/login/types';
import { WalletState } from './store/wallet/types';

export interface AppState {
    user: UserState
    login: LoginState
    wallet: WalletState
}

export default combineReducers({
    alertReducer,
    login,
    txReducer,
    user,
    wallet
})