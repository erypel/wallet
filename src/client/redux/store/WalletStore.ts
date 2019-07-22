import { createStore } from 'redux'
import Wallet from '../../model/Wallet';

const ADD_WALLET = 'ADD_WALLET'

interface State {
    wallets: Wallet[]
}

const initialState: State = {
    wallets: []
}

interface AddWalletAction {
    type: typeof ADD_WALLET
    payload: Wallet
}

type Actions = AddWalletAction

function reducer(state = initialState, action: Actions): State {
    const { type, payload } = action
    switch(type) {
        case ADD_WALLET:
            return {
                wallets: [...state.wallets, payload]
            }
        default:
            return state
    }
}

export function addWallet(newWallet: Wallet): AddWalletAction {
    return {
        type: ADD_WALLET,
        payload: newWallet
    }
}

export type AppState = ReturnType<typeof reducer>

const WalletStore = createStore(reducer)
export default WalletStore