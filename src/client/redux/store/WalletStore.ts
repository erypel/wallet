import { createStore } from 'redux'
import Wallet from '../../model/Wallet';
import { walletService } from '../services/walletService';
import { alerts } from './AlertStore';
import { LoginStore } from './LoginStore';

const ADD_WALLET = 'ADD_WALLET'
const SET_LIST = 'SET_LIST'

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

interface SetListAction {
    type: typeof SET_LIST
    payload: Wallet[]
}

type Actions = AddWalletAction | SetListAction

function reducer(state = initialState, action: Actions): State {
    const { type, payload } = action
    switch(type) {
        case ADD_WALLET:
            return {
                wallets: [...state.wallets, payload as Wallet]
            }
        case SET_LIST:
            return {
                wallets: payload as Wallet[]
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

function setList(wallets: Wallet[]): SetListAction {
    return {
        type: SET_LIST,
        payload: wallets
    }
}

export type AppState = ReturnType<typeof reducer>

const WalletStore = createStore(reducer)

export function create(wallet: Wallet) {
    walletService.create(wallet).then((newWallet?: Wallet) => {
        if (newWallet) {
            load(LoginStore.getState().user!!.id!!)
            //WalletStore.dispatch(addWallet(wallet))
        } else {
            const error = new Error('wallet is undefined')
            console.log(error)
        }
    }, (error: Error) => {
        alerts.error(error.message)
    })
}

export function load(userId: string) {
    walletService.loadList(userId).then((wallets: Wallet[]) => {
        WalletStore.dispatch(setList(wallets))
    })
}

export const ws = {
    load,
    create
}

export default WalletStore