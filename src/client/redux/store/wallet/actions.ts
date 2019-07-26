import { ADD_WALLET, AddWalletAction, WalletMap, SetListAction, SET_LIST } from './types'
import Wallet from '../../../model/Wallet'
import { walletService } from '../../services/walletService'
import { alerts } from '../AlertStore'
import { ActionCreator, Dispatch } from 'redux'

function addWalletAction(newWallet: Wallet): AddWalletAction {
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

export const create: ActionCreator<any> = (newWallet: Wallet, userId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(addWalletAction(newWallet))
        walletService.create(newWallet).then((newWallet?: Wallet) => {
            if (newWallet) {
                load(userId)
            } else {
                const error = new Error('wallet is undefined')
                console.log(error)
            }
        }, (error: Error) => {
            alerts.error(error.message)
        })
    }
}

export const load: ActionCreator<any> = (userId: string) => {
    return async (dispatch: Dispatch) => {
        walletService.loadList(userId).then((wallets: WalletMap) => {
            dispatch(setList(wallets))
        })
    }
}