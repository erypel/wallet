import EscrowCreationBuilder from './EscrowCreationBuilder'
import { TransactionBuilder } from '../TransactionBuilder'
import Transaction from '../Transaction'

export default class EscrowCreate extends Transaction {
    Amount: string
    Destination: string
    CancelAfter?: string
    FinishAfter?: string
    Condition?: string
    DestinationTag?: number

    constructor(txBuilder: TransactionBuilder, builder: EscrowCreationBuilder) {
        super(txBuilder)
        this.Amount = builder.amount
        this.Destination = builder.destination
        this.CancelAfter = builder.allowCancelAfter
        this.FinishAfter = builder.allowExecuteAfter
        this.Condition = builder.condition
        this.DestinationTag = builder.destinationTag
    }

    validate = () => {
        const { CancelAfter, FinishAfter } = this
        if (CancelAfter === undefined && FinishAfter === undefined) {
            throw Error('Either `CancelAfter` or `FinishAfter` must be specified.')
        }
        if (CancelAfter && FinishAfter && FinishAfter > CancelAfter ) {
            throw Error('FinishAfter must come before CancelAfter')
        }
    }
}