import Bid from '../../xrpl/api/model/transaction/Orderbook/Bid'
import { 
    SET_ASKS, SET_BIDS, SetAsksAction, SetBidsAction, OrderbookActions,
    SET_LOADING, SetLoadingAction, SetOpenOrdersAction, SET_OPEN_ORDERS, ADD_BID, 
    AddBidAction, AddAskAction, ADD_ASK, SetBaseAction, SET_BASE_CURRENCY, 
    SET_QUOTE_CURRECY, SetQuoteAction, RemoveBidAction, RemoveAskAction, 
    REMOVE_BID, REMOVE_ASK, OrderbookState 
} from './types'
import Ask from '../../xrpl/api/model/transaction/Orderbook/Ask'
import { ActionCreator, Dispatch } from 'redux'
import OrderCreate from '../../xrpl/api/model/transaction/OrderCreate/OrderCreate'
import { currencyService } from '../../services/currencyService'
import { AppState } from '../rootReducer'
import  Amount, { issuerAmountToAmount } from '../../xrpl/api/model/Amount'
import subscribeToBook from '../../xrpl/api/utils/subscribeToOrderbook'
import OrderCancellation from '../../xrpl/api/model/transaction/OrderCancellation/OrderCancellation'
import { AsksAndBids } from '../../xrpl/api/model/transaction/Orderbook/Orderbook'
import { getAccountOffers } from '../../xrpl/api/utils/account/accountOffers'
import AccountOffers, { AccountOffer } from '../../xrpl/api/model/account/AccountOffers'
import Offer from '../../xrpl/api/model/ledger/Offer'

function setOpenOrders(orders: AccountOffer[]): SetOpenOrdersAction {
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
        await getAccountOffers(account).then((response: AccountOffers) => {
            console.log('openOrders', response)
            dispatch(setOpenOrders(response.offers))
        })
    }
}

export const setTradingPair: ActionCreator<any> = (base: string, quote: string) => {
    return (dispatch: Dispatch<OrderbookActions>) => {
        dispatch(setBase(base))
        dispatch(setQuote(quote))
    }
}

export const setBaseCurrency: ActionCreator<any> = (base: string) => {
    return (dispatch: Dispatch<OrderbookActions>) => {
        dispatch(setBase(base))
    }
}

export const setQuoteCurrency: ActionCreator<any> = (quote: string) => {
    return (dispatch: Dispatch<OrderbookActions>) => {
        dispatch(setQuote(quote))
    }
}

export const addOfferToBook: ActionCreator<any> = (offer: Offer) => {
    return async (dispatch: Dispatch<OrderbookActions>, getState: () => AppState) => {
        const { orderbook } = getState()
        const {Account: account, Sequence: sequence, TakerGets, TakerPays } = offer
        addOrder(orderbook, TakerGets, TakerPays, account, sequence, dispatch)
    }
}

export const removeOfferFromBook: ActionCreator<any> = (offer: Offer) => {
    return async (dispatch: Dispatch<OrderbookActions>, getState: () => AppState) => {
        const { orderbook } = getState()
        const {Account: account, Sequence: accountSequence } = offer
        removeOrder(account, accountSequence, dispatch, orderbook)
    }
}

export const removeOrderFromBook: ActionCreator<any> = (order: OrderCancellation) => {
    return async (dispatch: Dispatch<OrderbookActions>, getState: () => AppState) => {
        const { orderbook } = getState()
        const {Account: account, OfferSequence: accountSequence } = order
        removeOrder(account, accountSequence, dispatch, orderbook)
    }
}

export const addOrderToBook: ActionCreator<any> = (order: OrderCreate) => {
    return async (dispatch: Dispatch<OrderbookActions>, getState: () => AppState) => {
        const { orderbook } = getState()
        const { TakerGets, TakerPays, Account, offerSequence } = order
        addOrder(orderbook, TakerGets, TakerPays, Account, offerSequence!!, dispatch)
    }
}

export const fetchOrderbook: ActionCreator<any> = (
    baseCurrency: string, 
    counterCurrency: string
) => {
    return async (dispatch: Dispatch<OrderbookActions>) => {
        dispatch(setLoading(true))
        dispatch(setBase(baseCurrency))
        dispatch(setQuote(counterCurrency))
        subscribeToBook(baseCurrency, counterCurrency).then((result: AsksAndBids) => {
            const { asks, bids } = result
            dispatch(setAsks(asks))
            dispatch(setBids(bids))
            dispatch(setLoading(false))
        })
        
    }
}

const removeOrder = (account: string, accountSequence: number, dispatch: Dispatch<OrderbookActions>, orderbook: OrderbookState) => {
    const { bids, asks } = orderbook
    for (let i = 0; i < bids.length; i++) {
        const bid = bids[i]
        const { maker, sequence } = bid.properties!!
        if (maker === account && sequence === accountSequence) {
            dispatch(removeBid(bid))
            return
        }
    }
    for(let i = 0; i < asks.length; i++) {
        const ask = asks[i]
        const { maker, sequence } = ask.properties!!
        if (maker === account && sequence === accountSequence) {
            dispatch(removeAsk(ask))
            return
        }
    }
}

const addOrder = (
    orderbook: OrderbookState, 
    TakerGets: Amount | string, 
    TakerPays: Amount | string, 
    Account: string, 
    offerSequence: number, 
    dispatch: Dispatch<OrderbookActions>
) => {
    const { baseCurrency, quoteCurrency } = orderbook
    const currency = currencyService.createAmount(TakerGets).currency
    if (baseCurrency === currency) {
        dispatch(addAsk({
            specification: {
                direction: 'SELL',
                quantity: issuerAmountToAmount(TakerGets),
                totalPrice: issuerAmountToAmount(TakerPays)
            },
            properties: {
                maker: Account,
                sequence: offerSequence!!,
                makerExchangeRate: ''
            },
            data: {}
        }))
    } else if(quoteCurrency === currency) {
        dispatch(addBid({
            specification: {
                direction: 'BUY',
                quantity: issuerAmountToAmount(TakerPays),
                totalPrice: issuerAmountToAmount(TakerGets)
            },
            properties: {
                maker: Account,
                sequence: offerSequence!!,
                makerExchangeRate: ''
            },
            data: {}
        }))
    } else {
        console.log('ERROR UPDATING ORDER BOOK')
    }
}