import Bid from '../../rippled/model/transaction/Orderbook/Bid'
import { SET_ASKS, SET_BIDS, SetAsksAction, SetBidsAction, OrderbookActions, SET_LOADING, SetLoadingAction } from './types'
import Ask from '../../rippled/model/transaction/Orderbook/Ask'
import { ActionCreator, Dispatch } from 'redux'
import { orderbookService } from '../../services/orderbookService'

function setBids(bids: Bid[]): SetBidsAction {
    return {
        type: SET_BIDS,
        payload: bids
    }
}

function setAsks(asks: Ask[]): SetAsksAction {
    return {
        type: SET_ASKS,
        payload: asks
    }
}

function setLoading(isLoading: boolean): SetLoadingAction {
    return {
        type: SET_LOADING,
        payload: isLoading
    }
}

export const fetchOrderbook: ActionCreator<any> = (
    address: string, 
    baseCurrency: string, 
    baseCounterparty: string, 
    counterCurrency: string,
    counterCounterparty: string
) => {
    return async (dispatch: Dispatch<OrderbookActions>) => {
        dispatch(setLoading(true))
        const orders = await orderbookService.getOrderbook(
            address,
            baseCurrency,
            baseCounterparty,
            counterCurrency,
            counterCounterparty
        )
        const { asks, bids } = orders
        dispatch(setAsks(asks))
        dispatch(setBids(bids))
        dispatch(setLoading(false))
    }
}