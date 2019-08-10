import Ask from '../../xrpl/api/model/transaction/Orderbook/Ask'
import Bid from '../../xrpl/api/model/transaction/Orderbook/Bid'
import Offer from '../../xrpl/rippled/model/Offer'

export const SET_ASKS = 'SET_ASKS'
export const SET_BIDS = 'SET_BIDS'
export const SET_OPEN_ORDERS = 'SET_OPEN_ORDERS'
export const SET_LOADING = 'SET_LOADING'

export interface OrderbookState {
    asks: Ask[]
    bids: Bid[]
    openOrders: Offer[]
    isLoading: boolean
}

export interface SetOpenOrdersAction {
    type: typeof SET_OPEN_ORDERS
    payload: Offer[]
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
    | SetOpenOrdersAction