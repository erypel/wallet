import { createStore } from 'redux'
import Wallet from '../../model/Wallet'
import { walletService } from '../services/walletService'
import { alerts } from './AlertStore'
import { LoginStore } from './LoginStore'

const ADD_WALLET = 'ADD_WALLET'
const SET_LIST = 'SET_LIST'

export type WalletMap = { [key:string]:Wallet }

interface State {
    wallets: { [key:string]:Wallet }
}

const initialState: State = {
    wallets: {}
}

interface AddWalletAction {
    type: typeof ADD_WALLET
    payload: Wallet
}

interface SetListAction {
    type: typeof SET_LIST
    payload: WalletMap
}

type Actions = AddWalletAction | SetListAction

export function reducer(state = initialState, action: Actions): State {
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

function setList(wallets: WalletMap): SetListAction {
    return {
        type: SET_LIST,
        payload: wallets
    }
}

export type WalletStoreState = ReturnType<typeof reducer>

const WalletStore = createStore(reducer)

export function create(wallet: Wallet) {
    walletService.create(wallet).then((newWallet?: Wallet) => {
        if (newWallet) {
            load(LoginStore.getState().user!!.id!!)
        } else {
            const error = new Error('wallet is undefined')
            console.log(error)
        }
    }, (error: Error) => {
        alerts.error(error.message)
    })
}

export function load(userId: string) {
    walletService.loadList(userId).then((wallets: WalletMap) => {
        WalletStore.dispatch(setList(wallets))
    })
}

function getPrivateKey(publicKey: string): string | undefined {
    const state = WalletStore.getState()
    const { wallets } = state
    const wallet = wallets[publicKey]
    if (wallet){
        return wallet.privateKey
    } else { return undefined }
}

export const ws = {
    load,
    create,
    getPrivateKey
}

export default WalletStore