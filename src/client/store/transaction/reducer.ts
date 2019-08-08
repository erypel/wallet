import { Reducer } from 'redux'
import { SET_SIGNED_TRANSACTION, SET_TX_JSON, SET_DEST_ADDRESS, SET_SRC_SECRET, SET_SRC_ADDRESS, SET_AMOUNT, TransactionState } from "./types";

const initialState: TransactionState = {
    amount: undefined,
    srcAddress: undefined,
    srcSecret: undefined,
    destAddress: undefined,
    txJSON: undefined,
    signedTransaction: undefined
}

const reducer:Reducer<TransactionState> = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case SET_AMOUNT:
            return {...state, amount: payload as string}
        case SET_SRC_ADDRESS:
            return {...state, srcAddress: payload as string}
        case SET_SRC_SECRET:
            return {...state, srcSecret: payload as string}
        case SET_DEST_ADDRESS:
            return {...state, destAddress: payload as string}
        case SET_TX_JSON:
            return {...state, txJSON: payload as string}
        case SET_SIGNED_TRANSACTION:
            return {...state, signedTransaction: payload}
        default:
            return state
    }
}

export default reducer