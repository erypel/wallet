import AccountSetBuilder from './AccountSetBuilder'
import Transaction from '../Transaction'
import { TransactionBuilder } from '../TransactionBuilder'

export default class AccountSet extends Transaction {
    ClearFlag?: number
    Domain?: string
    EmailHash?: string
    MessageKey?: string
    SetFlag?: number
    TransferRate?: number
    TickSize?: number
    WalletLocator?: string
    WalletSize?: number

    constructor(txBuilder: TransactionBuilder, builder: AccountSetBuilder) {
        super(txBuilder)
        this.ClearFlag = builder.clearFlag
        this.Domain = builder.domain
        this.EmailHash = builder.emailHash
        this.MessageKey = builder.messageKey
        this.SetFlag = builder.setFlag
        this.TransferRate = builder.transferRate
        this.TickSize = builder.tickSize
        this.WalletLocator = builder.walletLocator
        this.WalletSize = builder.walletSize
    }
}