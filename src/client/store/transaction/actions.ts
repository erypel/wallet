import { SET_TX_JSON, SET_SIGNED_TRANSACTION, SET_DEST_ADDRESS, SET_SRC_SECRET, SET_SRC_ADDRESS, SET_AMOUNT } from './types'
import SignedTransaction from '../../rippled/model/transaction/flow/SignedTransaction'

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

export const setTxJson = (txJson: string) => {
    return {type: SET_TX_JSON, payload: txJson}
}

export const setSignedTransaction = (tx: SignedTransaction) => {
    return {type: SET_SIGNED_TRANSACTION, payload: tx}
}