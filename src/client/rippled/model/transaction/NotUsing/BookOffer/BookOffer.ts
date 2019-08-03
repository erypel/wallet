import { BookOfferBuilder } from './BookOfferBuilder'

export class BookOffer {
    method: string = 'book_offers'
    params: BookOfferParams

    constructor(builder: BookOfferBuilder) {
        this.params = new BookOfferParams(builder)
    }
}

class BookOfferParams {
    ledger_hash?: string
    ledger_index?: string
    limit?: number
    marker?: object // TODO Marker
    taker?: string
    taker_gets: object
    taker_pays: object

    constructor(builder: BookOfferBuilder) {
        this.ledger_hash = builder.ledger_hash
        this.ledger_index = builder.ledger_index
        this.limit = builder.limit
        this.marker = builder.marker
        this.taker = builder.taker
        this.taker_gets = builder.taker_gets
        this.taker_pays =  builder.taker_pays
    }
}