import { TransactionBuilder } from '../TransactionBuilder'
import OrderCancellation from './OrderCancellation'

export class OrderCancellationBuilder {
    private _orderSequence: number

    constructor(orderSequence: number) {
        this._orderSequence = orderSequence
    }

    build(transactionBuilder: TransactionBuilder) {
        return new OrderCancellation(transactionBuilder, this)
    }

    setOrderSequence(offerSequence: number) {
        this._orderSequence = offerSequence
        return this
    }

    get orderSequence() {
        return this._orderSequence
    }
}