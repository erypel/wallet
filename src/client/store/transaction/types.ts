import SignedTransaction from '../../xrpl/api/model/transaction/flow/SignedTransaction'
import { AccountTransaction } from '../../xrpl/api/model/account/AccountTransactions'
import PreparedTransaction from '../../xrpl/api/model/transaction/flow/PreparedTransaction'

export interface TransactionState {
    amount?: string
    srcAddress?: string
    srcSecret?: string
    destAddress?: string
    txJSON?: string
    preparedTransaction?: PreparedTransaction
    signedTransaction?: SignedTransaction
    accountTransactions: AccountTransaction[]
    isLoadingAccountTransactions: boolean
}

export const SET_AMOUNT = 'SET_AMOUNT'
export const SET_SRC_ADDRESS = 'SET_SRC_ADDRESS'
export const SET_SRC_SECRET = 'SET_SRC_SECRET'
export const SET_DEST_ADDRESS = 'SET_DEST_ADDRESS'
export const SET_SIGNED_TRANSACTION = 'SET_SIGNED_TRANSACTION'
export const SET_PREPARED_TRANSACTION = 'SET_PREPARED_TRANSACTION'
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
export const SET_LOADING_TX = 'SET_LOADING_TX'

export interface SetAmount {
    type: typeof SET_AMOUNT
    payload: string
}
export interface SetSrcAddress {
    type: typeof SET_SRC_ADDRESS
    payload: string
}
export interface SetSrcSecret {
    type: typeof SET_SRC_SECRET
    payload: string
}
export interface SetDestAddress {
    type: typeof SET_DEST_ADDRESS
    payload: string
}

export interface SetSignedTransaction {
    type: typeof SET_SIGNED_TRANSACTION
    payload: SignedTransaction
}

export interface SetPreparedTransaction {
    type: typeof SET_PREPARED_TRANSACTION
    payload: PreparedTransaction
}

export interface SetAccountTransactions {
    type: typeof SET_TRANSACTIONS
    payload: AccountTransaction[]
}

export interface SetLoadingAccountTx {
    type: typeof SET_LOADING_TX
    payload: boolean
}

export type Actions = SetAmount | SetSrcAddress | SetSrcSecret | SetDestAddress |
    SetSignedTransaction | SetAccountTransactions | SetLoadingAccountTx