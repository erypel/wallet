import { Reducer } from 'redux'
import { 
    SET_SIGNED_TRANSACTION, SET_DEST_ADDRESS, SET_SRC_SECRET, 
    SET_SRC_ADDRESS, SET_AMOUNT, TransactionState, SET_TRANSACTIONS, SET_LOADING_TX, 
    SET_PREPARED_TRANSACTION 
} from './types'

const initialState: TransactionState = {
    amount: undefined,
    srcAddress: undefined,
    srcSecret: undefined,
    destAddress: undefined,
    txJSON: undefined,
    preparedTransaction: undefined,
    signedTransaction: undefined,
    accountTransactions: [],
    isLoadingAccountTransactions: false
}

const reducer:Reducer<TransactionState> = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case SET_AMOUNT:
            return {...state, amount: payload}
        case SET_SRC_ADDRESS:
            return {...state, srcAddress: payload}
        case SET_SRC_SECRET:
            return {...state, srcSecret: payload}
        case SET_DEST_ADDRESS:
            return {...state, destAddress: payload}
        case SET_PREPARED_TRANSACTION:
            return {...state, preparedTransaction: payload}
        case SET_SIGNED_TRANSACTION:
            return {...state, signedTransaction: payload}
        case SET_TRANSACTIONS:
            return {...state, accountTransactions: payload}
        case SET_LOADING_TX:
            return {...state, isLoadingAccountTransactions: payload}
        default:
            return state
    }
}

export default reducer