import { TransactionBuilder } from '../TransactionBuilder'
import Transaction from '../Transaction'
import { IssuerAmount } from '../../Amount'
import TrustSetBuilder from './TrustSetBuilder'

export default class TrustSet extends Transaction {
    LimitAmount: IssuerAmount
    QualityIn?: number
    QualityOut?: number

    constructor(txBuilder: TransactionBuilder, builder: TrustSetBuilder) {
        super(txBuilder)
        this.LimitAmount = builder.limitAmount
        this.QualityIn = builder.qualityIn
        this.QualityOut = builder.qualityOut
    }
}