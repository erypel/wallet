import Orderbook, { AsksAndBids, CurrencyCounterparty } from '../rippled/model/transaction/Orderbook/Orderbook'
import callForOrderbook from '../rippled/utils/getOrderbook'
import OrderbookBuilder from '../rippled/model/transaction/Orderbook/OrderbookBuilder'

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
    getOrderbook
}