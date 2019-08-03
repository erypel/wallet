import { BookOffer } from './BookOffer'

export class BookOfferBuilder {
    private readonly _taker_gets: object
    private readonly _taker_pays: object
    private _ledger_hash?: string
    private _ledger_index?: string
    private _limit?: number
    private _marker?: object // TODO Marker
    private _taker?: string
    
    constructor(takerGets: object, takerPays: object) {
        this._taker_gets = takerGets
        this._taker_pays = takerPays
    }

    build() {
        return new BookOffer(this)
    }

    setLedgerHash(ledgerHash: string) {
        this._ledger_hash = ledgerHash
        return this
    }

    setLedgerIndex(idx: string) {
        this._ledger_index = idx
        return this
    }

    setLimit(limit: number) {
        this._limit = limit
        return this
    }

    setMarker(marker: object) {
        this._marker = marker
        return this
    }

    setTaker(taker: string) {
        this._taker = taker
        return this
    }

    get taker_gets() {
        return this._taker_gets
    }

    get taker_pays() {
        return this._taker_pays
    }

    get ledger_hash() {
        return this._ledger_hash
    }

    get ledger_index() {
        return this._ledger_index
    }

    get limit() {
        return this._limit
    }

    get marker() {
        return this._marker
    }

    get taker() {
        return this._taker
    }
}