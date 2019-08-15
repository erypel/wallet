import Transaction from '../Transaction'
import { TransactionBuilder } from '../TransactionBuilder'
import EscrowFinishBuilder from './EscrowFinishBuilder'

export default class EscrowFinish extends Transaction {
    Owner: string
    OfferSequence: number
    Condition?: string
    Fulfillment?: string

    constructor(txBuilder: TransactionBuilder, builder: EscrowFinishBuilder) {
        super(txBuilder)
        this.Owner = builder.owner
        this.OfferSequence = builder.offerSequence
        this.Condition = builder.condition
        this.Fulfillment = builder.fulfillment
    }
}