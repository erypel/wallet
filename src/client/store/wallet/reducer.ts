import { WalletState, ADD_WALLET, SET_LIST, WalletMap, SET_ACTIVE_WALLET } from './types'
import { Reducer } from 'redux'
import Wallet from '../../model/Wallet'

const initialState: WalletState = {
    wallets: {},
    activeWallet: undefined
}

const reducer:Reducer<WalletState> = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case ADD_WALLET:
            return {
                ...state,
                wallets: {
                    ...state.wallets,
                    [(payload as Wallet).publicKey]: payload as Wallet
                }
            }
        case SET_LIST:
            return {
                wallets: payload as WalletMap
            }
        case SET_ACTIVE_WALLET:
            return {...state, activeWallet: payload}
        default:
            return state
    }
}

export default reducer