import OfferCreate from './OfferCreate'
import Amount from '../Amount'
import { TransactionBuilder } from './TransactionBuilder';

export class OfferCreateBuilder {
    private _expiration?: number = undefined
    private _offerSequence?: number = undefined
    private _takeGets: Amount
    private _takerPays: Amount

    constructor(takerGets: Amount, takerPays: Amount) {
        this._takeGets = takerGets
        this._takerPays = takerPays
    }

    build(transactionBuilder: TransactionBuilder) {
        return new OfferCreate(transactionBuilder, this)
    }

    setExpiration(expiration: number) {
        this._expiration = expiration
        return this
    }

    setOfferSequence(offerSequence: number) {
        this._offerSequence = offerSequence
        return this
    }

    get takerGets() {
        return this._takeGets
    }

    get takerPays() {
        return this._takerPays
    }

    get expiration() {
        return this._expiration
    }

    get offerSequence() {
        return this._offerSequence
    }
}