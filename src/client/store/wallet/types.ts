import Wallet from "../../model/Wallet"

export const ADD_WALLET = 'ADD_WALLET'
export const SET_LIST = 'SET_LIST'

export type WalletMap = { [key:string]:Wallet }

export interface WalletState {
    wallets: { [key:string]:Wallet }
}

export interface AddWalletAction {
    type: typeof ADD_WALLET
    payload: Wallet
}

export interface SetListAction {
    type: typeof SET_LIST
    payload: WalletMap
}

export type WalletActions = AddWalletAction | SetListAction