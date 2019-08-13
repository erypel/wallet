import Orderbook, { AsksAndBids, CurrencyCounterparty } from '../xrpl/api/model/transaction/Orderbook/Orderbook'
import callForOrderbook from '../xrpl/api/utils/getOrderbook'
import OrderbookBuilder from '../xrpl/api/model/transaction/Orderbook/OrderbookBuilder'
import Ask from '../xrpl/api/model/transaction/Orderbook/Ask'
import Bid from '../xrpl/api/model/transaction/Orderbook/Bid'
import OrderCreate from '../xrpl/api/model/transaction/OrderCreate/OrderCreate'
import { addOrderToBook, removeOrderFromBook } from '../store/orderbook/actions'
import { getStore } from '../../App'
import OrderCancellation from '../xrpl/api/model/transaction/OrderCancellation/OrderCancellation'

async function getBids(
    address: string, 
    baseCurrency: string, 
    baseCounterparty: string = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq', 
    counterCurrency: string,
    counterCounterparty: string = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'
    ): Promise<Bid[]> {
        return await getOrderbook(
            address, baseCurrency, baseCounterparty, counterCurrency, counterCounterparty
        ).then((asksAndBids: AsksAndBids) => {
            return asksAndBids.bids
        })
}

async function getAsks(
    address: string, 
    baseCurrency: string, 
    baseCounterparty: string, 
    counterCurrency: string,
    counterCounterparty: string
): Promise<Ask[]> {
    return await getOrderbook(
        address, baseCurrency, baseCounterparty, counterCurrency, counterCounterparty
    ).then((asksAndBids: AsksAndBids) => {
        return asksAndBids.asks
    })
}

async function getOrderbook(
    address: string, 
    baseCurrency: string, 
    baseCounterparty: string, 
    counterCurrency: string,
    counterCounterparty: string
): Promise<AsksAndBids>{
    const base =  createCurrencyCounterpartyObject(baseCurrency, baseCounterparty)
    const counter = createCurrencyCounterpartyObject(counterCurrency, counterCounterparty)
    const orderbook = buildOrderbook(base, counter)
    const asksAndBids = await callForOrderbook(address, orderbook)
    return asksAndBids
}

function createCurrencyCounterpartyObject(
    currency: string, counterparty?: string
): CurrencyCounterparty {
    if (currency === 'XRP') {
        return {
            currency: 'XRP'
        }
    } else {
        return {
            currency: currency,
            counterparty: counterparty
        }
    }
}

function handleIncomingOrderCreate(order: OrderCreate) {
    console.log(`recieved order ${order.TransactionType}`)
    getStore().dispatch(addOrderToBook(order))
}

function handleIncomingOrderCancel(order: OrderCancellation) {
    getStore().dispatch(removeOrderFromBook(order))
}

function buildOrderbook(
    base: CurrencyCounterparty, counter: CurrencyCounterparty
): Orderbook {
    const builder = new OrderbookBuilder(base, counter)
    return builder.build()
}

export const orderbookService = {
    getOrderbook,
    getAsks,
    getBids,
    handleIncomingOrderCreate,
    handleIncomingOrderCancel
}