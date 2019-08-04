import Bid from '../../xrpl/api/model/transaction/Orderbook/Bid'
import { SET_ASKS, SET_BIDS, SetAsksAction, SetBidsAction, OrderbookActions, SET_LOADING, SetLoadingAction } from './types'
import Ask from '../../xrpl/api/model/transaction/Orderbook/Ask'
import { ActionCreator, Dispatch } from 'redux'
import { orderbookService } from '../../services/orderbookService'
import { rippledStream } from '../../xrpl/rippled/methods/stream';
import { bookService } from '../../xrpl/rippled/services/bookService';

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

        // this code will fetch a specific order book, but we want the autobridged one
        // const orders = await orderbookService.getOrderbook(
        //     address,
        //     baseCurrency,
        //     baseCounterparty,
        //     counterCurrency,
        //     counterCounterparty
        // )
        // const { asks, bids } = orders
        rippledStream.subscribeToBook().then(result => {
            bookService.getAsksAndBidsFromResult(result)

            //dispatch(setAsks(asks))
           // dispatch(setBids(bids))
            dispatch(setLoading(false))
        })
        
    }
}