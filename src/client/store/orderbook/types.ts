import Ask from '../../rippled/model/transaction/Orderbook/Ask'
import Bid from '../../rippled/model/transaction/Orderbook/Bid'

export const SET_ASKS = 'SET_ASKS'
export const SET_BIDS = 'SET_BIDS'
export const SET_LOADING = 'SET_LOADING'

export interface OrderbookState {
    asks: Ask[]
    bids: Bid[]
    isLoading: boolean
}

export interface SetBidsAction {
    type: typeof SET_BIDS
    payload: Bid[]
}

export interface SetAsksAction {
    type: typeof SET_ASKS
    payload: Ask[]
}

export interface SetLoadingAction {
    type: typeof SET_LOADING
    payload: boolean
}

export type OrderbookActions = SetBidsAction | SetAsksAction | SetLoadingAction