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
        this.ClearFlag
        this.Domain
        this.EmailHash
        this.MessageKey
        this.SetFlag
        this.TransferRate
        this.TickSize
        this.WalletLocator
        this.WalletSize
    }
}