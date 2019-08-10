import OrderCreate from './OrderCreate'
import { TransactionBuilder } from '../TransactionBuilder'
import Amount, { IssuerAmount, amountToIssuerAmount } from '../../Amount'

export class OrderCreateBuilder {
    private _expiration?: string = undefined
    private _offerSequence?: number = undefined
    private _takeGets: IssuerAmount | string
    private _takerPays: IssuerAmount | string

    constructor(takerGets: Amount | string, takerPays: Amount | string) {
        this._takeGets = !(typeof takerGets === 'string') ? amountToIssuerAmount(takerGets) : takerGets
        this._takerPays = !(typeof takerPays === 'string') ? amountToIssuerAmount(takerPays) : takerPays
    }

    build(transactionBuilder: TransactionBuilder) {
        return new OrderCreate(transactionBuilder, this)
    }

    setExpiration(expiration: string) {
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