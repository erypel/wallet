import { Reducer } from 'redux'
import { 
    OrderbookState, SET_BIDS, SET_ASKS, SET_LOADING, SET_OPEN_ORDERS, 
    SET_BASE_CURRENCY, SET_QUOTE_CURRECY, ADD_ASK, ADD_BID, REMOVE_ASK, 
    REMOVE_BID 
} from './types'

const initialState: OrderbookState = {
    baseCurrency: 'XRP',
    quoteCurrency: 'USD',
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
            return {...state, asks: [...state.asks, payload]}
        case ADD_BID:
            return {...state, bids: [...state.bids, payload]}
        case REMOVE_ASK:
            return {...state, asks: state.asks.filter(ask => ask !== payload)}
        case REMOVE_BID:
            return {...state, bids: state.bids.filter(bid => bid !== payload)}
        default:
            return state
    }
}

export default reducer