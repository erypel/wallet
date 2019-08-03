import { CurrencyCounterparty } from './Orderbook'

export default class OrderbookBuilder {
    private readonly _base: CurrencyCounterparty
    private readonly _counter: CurrencyCounterparty
    private _ledgerVersion?: number | string
    private _limit?: number

    constructor(base: CurrencyCounterparty, counter: CurrencyCounterparty) {
        this._base = base
        this._counter = counter
    }

    build() {
        return this
    }

    setLedgerVersion(ledgerVersion: number | string) {
        this._ledgerVersion = ledgerVersion
        return this
    }

    setLimit(limit: number) {
        this._limit = limit
        return this
    }

    get base() {
        return this._base
    }

    get counter() {
        return this._counter
    }

    get ledgerVersion() {
        return this._ledgerVersion
    }

    get limit() {
        return this._limit
    }
}