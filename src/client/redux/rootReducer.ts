import { combineReducers } from 'redux'
import tx from './store/wallet/reducer'
import user from './store/user/reducer'
import login from './store/login/reducer'
import wallet from './store/wallet/reducer'
import { UserState } from './store/user/types'
import { LoginState } from './store/login/types'
import { WalletState } from './store/wallet/types'
import { TransactionState } from './store/transaction/types'

export interface AppState {
    user: UserState
    login: LoginState
    wallet: WalletState
    tx: TransactionState
}

export default combineReducers({
    login,
    tx,
    user,
    wallet
})