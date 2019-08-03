import { Reducer } from 'redux'
import { OrderbookState, SET_BIDS, SET_ASKS, SET_LOADING } from './types'

const initialState: OrderbookState = {
    asks: [],
    bids: [],
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
        default:
            return state
    }
}

export default reducer