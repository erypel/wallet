import OfferCreate from './OfferCreate'
import { TransactionBuilder } from '../TransactionBuilder'
import Amount, { IssuerAmount } from '../../Amount'

export class OfferCreateBuilder {
    private _expiration?: number = undefined
    private _offerSequence?: number = undefined
    private _takeGets: IssuerAmount | string
    private _takerPays: IssuerAmount | string

    constructor(takerGets: Amount | string, takerPays: Amount | string) {
        this._takeGets = (takerGets instanceof Amount) ? takerGets.toIssuerAmount() : takerGets
        this._takerPays = (takerPays instanceof Amount) ? takerPays.toIssuerAmount() : takerPays
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