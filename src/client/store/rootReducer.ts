import { combineReducers } from 'redux'
import tx from './transaction/reducer'
import user from './user/reducer'
import login from './login/reducer'
import wallet from './wallet/reducer'
import orderbook from './orderbook/reducer'
import { UserState } from './user/types'
import { LoginState } from './login/types'
import { WalletState } from './wallet/types'
import { TransactionState } from './transaction/types'
import { OrderbookState } from './orderbook/types'

export interface AppState {
    user: UserState
    login: LoginState
    wallet: WalletState
    tx: TransactionState
    orderbook: OrderbookState
}

export default combineReducers({
    login,
    tx,
    user,
    wallet,
    orderbook
})