import { 
    SET_SIGNED_TRANSACTION, SET_DEST_ADDRESS, SET_SRC_SECRET, 
    SET_SRC_ADDRESS, SET_AMOUNT, SetAccountTransactions, SET_TRANSACTIONS, 
    SetLoadingAccountTx, SET_LOADING_TX, SET_PREPARED_TRANSACTION 
} from './types'
import SignedTransaction from '../../xrpl/api/model/transaction/flow/SignedTransaction'
import { AccountTransaction } from '../../xrpl/api/model/account/AccountTransactions'
import { ActionCreator, Dispatch } from 'redux'
import { getAccountTx } from '../../xrpl/api/utils/account/accountTx'
import PreparedTransaction from '../../xrpl/api/model/transaction/flow/PreparedTransaction'

export const setAmount = (amount: string) => {
    return {type: SET_AMOUNT, payload: amount}
}

export const setSrcAddress = (address: string) => {
    return {type: SET_SRC_ADDRESS, payload: address}
}

export const setSrcSecret = (secret: string) => {
    return {type: SET_SRC_SECRET, payload: secret}
}

export const setDestAddress= (address: string) => {
    return {type: SET_DEST_ADDRESS, payload: address}
}

export const setPreparedTransaction = (tx: PreparedTransaction) => {
    return {type: SET_PREPARED_TRANSACTION, payload: tx}
}

export const setSignedTransaction = (tx: SignedTransaction) => {
    return {type: SET_SIGNED_TRANSACTION, payload: tx}
}

function setAccountTransactions(accountTransactions: AccountTransaction[]): SetAccountTransactions {
    return {
        type: SET_TRANSACTIONS,
        payload: accountTransactions
    }
}

function setIsLoadingAccountTransactions(isLoading: boolean): SetLoadingAccountTx {
    return {
        type: SET_LOADING_TX,
        payload: isLoading
    }
}

export const setTransactionsForAccount: ActionCreator<any> = (account: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoadingAccountTransactions(true))
        const accountTransactions = await getAccountTx(account)
        const { transactions } = accountTransactions
        dispatch(setAccountTransactions(transactions))
        dispatch(setIsLoadingAccountTransactions(false))
    }
}