import { TransactionBuilder } from '../TransactionBuilder'
import Transaction from '../Transaction'
import EscrowCancellationBuilder from './EscrowCancellationBuilder'

export default class EscrowCancel extends Transaction {
    Owner: string
    OfferSequence: number

    constructor(txBuilder: TransactionBuilder, builder: EscrowCancellationBuilder) {
        super(txBuilder)
        this.Owner = builder.owner
        this.OfferSequence = builder.offerSequence
    }
}