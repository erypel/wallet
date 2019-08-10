import Bid from '../../xrpl/api/model/transaction/Orderbook/Bid'
import { SET_ASKS, SET_BIDS, SetAsksAction, SetBidsAction, OrderbookActions, SET_LOADING, SetLoadingAction, SetOpenOrdersAction, SET_OPEN_ORDERS } from './types'
import Ask from '../../xrpl/api/model/transaction/Orderbook/Ask'
import { ActionCreator, Dispatch } from 'redux'
import { rippledStream } from '../../xrpl/rippled/methods/stream'
import { rippledAccount } from '../../xrpl/rippled/methods/account'
import Offer from '../../xrpl/rippled/model/Offer'
import RippledResponse from '../../xrpl/rippled/model/RippledResponse';

function setOpenOrders(orders: Offer[]): SetOpenOrdersAction {
    return {
        type: SET_OPEN_ORDERS,
        payload: orders
    }
}

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

export const fetchOpenOrders: ActionCreator<any> = (account: string) => {
    return async (dispatch: Dispatch<OrderbookActions>) => {
        await rippledAccount.account_offers(account).then((response: RippledResponse) => {
            console.log('openOrders', response.result)
            dispatch(setOpenOrders(response.result.offers))
        })
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
        rippledStream.subscribeToBook(baseCurrency, counterCurrency).then((result: {asks: Ask[], bids: Bid[]}) => {
            const { asks, bids } = result
            dispatch(setAsks(asks))
            dispatch(setBids(bids))
            dispatch(setLoading(false))
        })
        
    }
}