import EscrowCreationBuilder from './EscrowCreationBuilder'
import { TransactionBuilder } from '../TransactionBuilder'
import Transaction from '../Transaction'

export default class Orderbook extends Transaction {
    amount: string
    destination: string
    allowCancelAfter?: string
    allowExecuteAfter?: string
    condition?: string
    destinationTag?: number

    constructor(txBuilder: TransactionBuilder, builder: EscrowCreationBuilder) {
        super(txBuilder)
        this.amount = builder.amount
        this.destination = builder.destination
        this.allowCancelAfter = builder.allowCancelAfter
        this.allowExecuteAfter = builder.allowExecuteAfter
        this.condition = builder.condition
        this.destinationTag = builder.destinationTag
    }
}