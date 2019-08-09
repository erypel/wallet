import Wallet from '../../model/Wallet'

export const ADD_WALLET = 'ADD_WALLET'
export const SET_LIST = 'SET_LIST'
export const SET_ACTIVE_WALLET = 'SET_ACTIVE_WALLET'

export type WalletMap = { [key:string]:Wallet }

export interface WalletState {
    wallets: { [key:string]:Wallet }
    activeWallet?: Wallet
}

export interface AddWalletAction {
    type: typeof ADD_WALLET
    payload: Wallet
}

export interface SetListAction {
    type: typeof SET_LIST
    payload: WalletMap
}

export interface SetActiveWalletAction {
    type: typeof SET_ACTIVE_WALLET
    payload: Wallet
}

export type WalletActions = AddWalletAction | SetListAction | SetActiveWalletAction