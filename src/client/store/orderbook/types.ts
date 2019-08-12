import Ask from '../../xrpl/api/model/transaction/Orderbook/Ask'
import Bid from '../../xrpl/api/model/transaction/Orderbook/Bid'
import Offer from '../../xrpl/rippled/model/Offer'

export const SET_ASKS = 'SET_ASKS'
export const SET_BIDS = 'SET_BIDS'
export const SET_OPEN_ORDERS = 'SET_OPEN_ORDERS'
export const SET_LOADING = 'SET_LOADING'
export const ADD_BID = 'ADD_BID'
export const ADD_ASK = 'ADD_ASK'
export const SET_BASE_CURRENCY = 'SET_BASE'
export const SET_QUOTE_CURRECY = 'SET_QUOTE'
export const REMOVE_ASK = 'REMOVE_ASK'
export const REMOVE_BID = 'REMOVE_BID'

export interface OrderbookState {
    baseCurrency: string,
    quoteCurrency: string,
    asks: Ask[]
    bids: Bid[]
    openOrders: Offer[]
    isLoading: boolean
}

export interface AddBidAction {
    type: typeof ADD_BID
    payload: Bid
}

export interface AddAskAction {
    type: typeof ADD_ASK
    payload: Ask
}

export interface RemoveBidAction {
    type: typeof REMOVE_BID
    payload: Bid
}

export interface RemoveAskAction {
    type: typeof REMOVE_ASK
    payload: Ask
}

export interface SetBaseAction {
    type: typeof SET_BASE_CURRENCY
    payload: string
}

export interface SetQuoteAction {
    type: typeof SET_QUOTE_CURRECY
    payload: string
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
    | SetOpenOrdersAction | AddBidAction | AddAskAction | SetBaseAction 
    | SetQuoteAction | RemoveAskAction | RemoveBidAction