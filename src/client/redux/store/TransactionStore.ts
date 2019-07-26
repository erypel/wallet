import { createStore } from 'redux'
import SignedTransaction from '../../rippled/model/transaction/flow/SignedTransaction';

interface State {
    amount?: string
    srcAddress?: string
    srcSecret?: string
    destAddress?: string
    txJSON?: string
    signedTransaction?: SignedTransaction
}

const initialState: State = {
    amount: undefined,
    srcAddress: undefined,
    srcSecret: undefined,
    destAddress: undefined,
    txJSON: undefined,
    signedTransaction: undefined
}

const SET_AMOUNT = 'SET_AMOUNT'
const SET_SRC_ADDRESS = 'SET_SRC_ADDRESS'
const SET_SRC_SECRET = 'SET_SRC_SECRET'
const SET_DEST_ADDRESS = 'SET_DEST_ADDRESS'
const SET_TX_JSON = 'SET_TX_JSON'
const SET_SIGNED_TRANSACTION = 'SET_SIGNED_TRANSACTION'

interface SetAmount {
    type: typeof SET_AMOUNT
    payload: string
}
interface SetSrcAddress {
    type: typeof SET_SRC_ADDRESS
    payload: string
}
interface SetSrcSecret {
    type: typeof SET_SRC_SECRET
    payload: string
}
interface SetDestAddress {
    type: typeof SET_DEST_ADDRESS
    payload: string
}
interface SetTxJson {
    type: typeof SET_TX_JSON
    payload: string
}
interface SetSignedTransaction {
    type: typeof SET_SIGNED_TRANSACTION
    payload: SignedTransaction
}

type Actions = SetAmount | SetSrcAddress | SetSrcSecret | SetDestAddress |
    SetTxJson | SetSignedTransaction

export function reducer(state = initialState, action: Actions): State {
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
            return {...state, signedTransaction: payload as SignedTransaction}
        default:
            return state
    }
}

const TransactionStore = createStore(reducer)

export function setAmount(amount: string) {
    TransactionStore.dispatch({type: SET_AMOUNT, payload: amount})
}

export function setSrcAddress(address: string) {
    TransactionStore.dispatch({type: SET_SRC_ADDRESS, payload: address})
}

export function setSrcSecret(secret: string) {
    TransactionStore.dispatch({type: SET_SRC_SECRET, payload: secret})
}

export function setDestAddress(address: string) {
    TransactionStore.dispatch({type: SET_DEST_ADDRESS, payload: address})
}

export function setTxJson(txJson: string) {
    TransactionStore.dispatch({type: SET_TX_JSON, payload: txJson})
}

export function setSignedTransaction(tx: SignedTransaction) {
    TransactionStore.dispatch({type: SET_SIGNED_TRANSACTION, payload: tx})
}

export type TransactionState = ReturnType<typeof reducer>
export default TransactionStore