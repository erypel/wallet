import Bid from '../../xrpl/api/model/transaction/Orderbook/Bid'
import { SET_ASKS, SET_BIDS, SetAsksAction, SetBidsAction, OrderbookActions, SET_LOADING, SetLoadingAction, SetOpenOrdersAction, SET_OPEN_ORDERS, ADD_BID, AddBidAction, AddAskAction, ADD_ASK, OrderbookState, SetBaseAction, SET_BASE_CURRENCY, SET_QUOTE_CURRECY, SetQuoteAction, RemoveBidAction, RemoveAskAction, REMOVE_BID, REMOVE_ASK } from './types'
import Ask from '../../xrpl/api/model/transaction/Orderbook/Ask'
import { ActionCreator, Dispatch } from 'redux'
import { rippledAccount } from '../../xrpl/rippled/methods/account'
import Offer from '../../xrpl/rippled/model/Offer'
import RippledResponse from '../../xrpl/rippled/model/RippledResponse'
import OrderCreate from '../../xrpl/api/model/transaction/OrderCreate/OrderCreate'
import { currencyService } from '../../services/currencyService'
import { AppState } from '../rootReducer'
import  { issuerAmountToAmount } from '../../xrpl/api/model/Amount'
import subscribeToBook from '../../xrpl/api/utils/subscribeToOrderbook'
import OrderCancellation from '../../xrpl/api/model/transaction/OrderCancellation/OrderCancellation';

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

function setBase(base: string): SetBaseAction {
    return {
        type: SET_BASE_CURRENCY,
        payload: base
    }
}

function setQuote(quote: string): SetQuoteAction {
    return {
        type: SET_QUOTE_CURRECY,
        payload: quote
    }
}

function addBid(order: Bid): AddBidAction {
    return {
        type: ADD_BID,
        payload: order
    }
}

function addAsk(order: Ask): AddAskAction {
    return {
        type: ADD_ASK,
        payload: order
    }
}

function removeBid(bid: Bid): RemoveBidAction {
    return {
        type: REMOVE_BID,
        payload: bid
    }
}

function removeAsk(ask: Ask): RemoveAskAction {
    return {
        type: REMOVE_ASK,
        payload: ask
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

export const setBaseCurrency: ActionCreator<any> = (base: string) => {
    return (dispatch: Dispatch<OrderbookActions>) => {
        dispatch(setBaseCurrency(base))
    }
}

export const setQuoteCurrency: ActionCreator<any> = (quote: string) => {
    return (dispatch: Dispatch<OrderbookActions>) => {
        dispatch(setBaseCurrency(quote))
    }
}

export const removeOrderFromBook: ActionCreator<any> = (order: OrderCancellation) => {
    return async (dispatch: Dispatch<OrderbookActions>, getState: () => AppState) => {
        const { orderbook } = getState()
        const { bids: b, asks:a } = orderbook
        var bids = b
        var asks = a
        console.log(order)
        const {Account: account, OfferSequence: accountSequence } = order
        for (let i = 0; i < bids.length; i++) {
            const bid = bids[i]
            const { maker, sequence } = bid.properties
            if (maker === account && sequence === accountSequence) {
                dispatch(removeBid(bid))
                break
            }
        }
        for(let i = 0; i < asks.length; i++) {
            const ask = asks[i]
            const { maker, sequence } = ask.properties
            if (maker === account && sequence === accountSequence) {
                dispatch(removeAsk(ask))
                break
            }
        }
    }
}

export const addOrderToBook: ActionCreator<any> = (order: OrderCreate) => {
    return async (dispatch: Dispatch<OrderbookActions>, getState: () => AppState) => {
        const { orderbook } = getState()
        const { baseCurrency, quoteCurrency } = orderbook
        const currency = currencyService.createAmount(order.TakerGets).currency
        if (baseCurrency === currency) {
            dispatch(addAsk({
                specification: {
                    direction: 'BUY',
                    quantity: issuerAmountToAmount(order.TakerGets),
                    totalPrice: issuerAmountToAmount(order.TakerPays)
                },
                properties: {
                    maker: '',
                    sequence: 0,
                    makerExchangeRate: ''
                },
                data: {}
            }))
        } else if(quoteCurrency === currency) {
            dispatch(addBid({
                specification: {
                    direction: 'SELL',
                    quantity: issuerAmountToAmount(order.TakerGets),
                    totalPrice: issuerAmountToAmount(order.TakerPays)
                },
                properties: {
                    maker: '',
                    sequence: 0,
                    makerExchangeRate: ''
                },
                data: {}
            }))
        } else {
            console.log('ERROR UPDATING ORDER BOOK')
        }
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
        dispatch(setBase(baseCurrency))
        dispatch(setQuote(counterCurrency))
        // this code will fetch a specific order book, but we want the autobridged one
        // const orders = await orderbookService.getOrderbook(
        //     address,
        //     baseCurrency,
        //     baseCounterparty,
        //     counterCurrency,
        //     counterCounterparty
        // )
        // const { asks, bids } = orders
        subscribeToBook(baseCurrency, counterCurrency).then((result: any) => {
            const { asks, bids } = result
            dispatch(setAsks(asks))
            dispatch(setBids(bids))
            dispatch(setLoading(false))
        })
        
    }
}