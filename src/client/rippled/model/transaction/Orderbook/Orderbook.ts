import OrderbookBuilder from './OrderbookBuilder'
import Ask from './Ask'
import Bid from './Bid'

export type AsksAndBids = {
    asks: Ask[]
    bids: Bid[]
}

export type CurrencyCounterparty = {
    currency: string
    counterparty?: string
}

export default class Orderbook {
    base: CurrencyCounterparty
    counter: CurrencyCounterparty
    options?: OrderbookOptions

    constructor(builder: OrderbookBuilder) {
        this.base = builder.base
        this.counter = builder.counter
        this.options = new OrderbookOptions(builder)
    }
}

class OrderbookOptions {
    ledgerVersion?: number | string
    limit?: number

    constructor(builder: OrderbookBuilder) {
        this.ledgerVersion = builder.ledgerVersion
        this.limit = builder.limit
    }
}