import { ADD_WALLET, AddWalletAction, WalletMap, SetListAction, SET_LIST } from './types'
import Wallet from '../../model/Wallet'
import { walletService } from '../../services/walletService'
import { ActionCreator, Dispatch } from 'redux'
import getBalances from '../../xrpl/api/utils/getBalances'

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
        newWallet.balance = '0'
        dispatch(addWalletAction(newWallet))
        walletService.create(newWallet).then((newWallet?: Wallet) => {
            if (newWallet) {
                load(userId)
            } else {
                const error = new Error('wallet is undefined')
                console.log(error)
            }
        }, (error: Error) => {
            console.log(error.message)
        })
    }
}

export const load: ActionCreator<any> = (userId: string) => {
    return async (dispatch: Dispatch) => {
        walletService.loadList(userId).then(async (wallets: WalletMap) => {
           const walletsWithBalances: WalletMap = {}
           var justWallets = Array.from(Object.values(wallets))
           try {
                for(const wallet of justWallets) {
                // await justWallets.forEach(async wallet => {
                    try {
                        const balances = await getBalances(wallet.publicKey)
                        wallet.balance = balances[0].value
                        const walletWithBalance = wallet
                        walletsWithBalances[wallet.publicKey] = walletWithBalance
                    } catch (error) {
                        wallet.balance = '0'
                        const walletWithBalance = wallet
                        walletsWithBalances[wallet.publicKey] = walletWithBalance
                    }
                }
            } finally {
                dispatch(setList(walletsWithBalances))
            }
        })
    }
}