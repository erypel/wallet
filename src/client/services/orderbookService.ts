import Orderbook, { AsksAndBids, CurrencyCounterparty } from '../xrpl/api/model/transaction/Orderbook/Orderbook'
import callForOrderbook from '../xrpl/api/utils/getOrderbook'
import OrderbookBuilder from '../xrpl/api/model/transaction/Orderbook/OrderbookBuilder'
import Ask from '../xrpl/api/model/transaction/Orderbook/Ask'
import Bid from '../xrpl/api/model/transaction/Orderbook/Bid'

async function getBids(
    address: string, 
    baseCurrency: string, 
    baseCounterparty: string, 
    counterCurrency: string,
    counterCounterparty: string
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

function buildOrderbook(
    base: CurrencyCounterparty, counter: CurrencyCounterparty
): Orderbook {
    const builder = new OrderbookBuilder(base, counter)
    return builder.build()
}

export const orderbookService = {
    getOrderbook,
    getAsks,
    getBids
}