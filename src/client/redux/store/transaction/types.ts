import SignedTransaction from '../../../rippled/model/transaction/flow/SignedTransaction'

export interface TransactionState {
    amount?: string
    srcAddress?: string
    srcSecret?: string
    destAddress?: string
    txJSON?: string
    signedTransaction?: SignedTransaction
}

export const SET_AMOUNT = 'SET_AMOUNT'
export const SET_SRC_ADDRESS = 'SET_SRC_ADDRESS'
export const SET_SRC_SECRET = 'SET_SRC_SECRET'
export const SET_DEST_ADDRESS = 'SET_DEST_ADDRESS'
export const SET_TX_JSON = 'SET_TX_JSON'
export const SET_SIGNED_TRANSACTION = 'SET_SIGNED_TRANSACTION'

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
export interface SetTxJson {
    type: typeof SET_TX_JSON
    payload: string
}
export interface SetSignedTransaction {
    type: typeof SET_SIGNED_TRANSACTION
    payload: SignedTransaction
}

export type Actions = SetAmount | SetSrcAddress | SetSrcSecret | SetDestAddress |
    SetTxJson | SetSignedTransaction