import { Reducer } from 'redux'
import { OrderbookState, SET_BIDS, SET_ASKS, SET_LOADING, SET_OPEN_ORDERS, SET_BASE_CURRENCY, SET_QUOTE_CURRECY, ADD_ASK, ADD_BID } from './types'

const initialState: OrderbookState = {
    baseCurrency: '',
    quoteCurrency: '',
    asks: [],
    bids: [],
    openOrders: [],
    isLoading: false
}

const reducer:Reducer<OrderbookState> = (state = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case SET_LOADING:
            return {...state, isLoading: payload}
        case SET_BIDS:
            return {...state, bids: payload}
        case SET_ASKS:
            return {...state, asks: payload}
        case SET_OPEN_ORDERS:
            return {...state, openOrders: payload}
        case SET_BASE_CURRENCY:
            return {...state, baseCurrency: payload}
        case SET_QUOTE_CURRECY:
            return {...state, quoteCurrency: payload}
        case ADD_ASK:
            return {...state, asks: state.asks.push(payload)}
        case ADD_BID:
            return {...state, bids: state.bids.push(payload)}
        default:
            return state
    }
}

export default reducer