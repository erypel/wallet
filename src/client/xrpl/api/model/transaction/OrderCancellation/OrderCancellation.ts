import Transaction from '../Transaction'
import { TransactionBuilder } from '../TransactionBuilder'
import { OrderCancellationBuilder } from './OrderCancellationBuilder'

export default class OrderCancellation extends Transaction {
    OfferSequence: number

    constructor(transactionBuilder: TransactionBuilder, orderCancellationBuilder: OrderCancellationBuilder) {
        super(transactionBuilder)
        this.OfferSequence = orderCancellationBuilder.orderSequence
    }
}