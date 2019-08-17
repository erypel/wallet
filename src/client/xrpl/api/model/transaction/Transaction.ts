import { TransactionBuilder } from './TransactionBuilder'

export default class Transaction {
  Account: string
  TransactionType: string
  Fee?: string
  Sequence?: number
  AccountTxnId?: string
  Flags?: Set<number>
  LastLedgerSequnces?: number
  Memos?: object[]
  Signers?: object[]
  SourceTag?: number
  SigningPubKey?: string
  TxnSignature?: string

  constructor(builder: TransactionBuilder) {
    this.Account = builder.account
    this.TransactionType = builder.transactionType
    this.Fee = builder.fee
    this.Sequence = builder.sequence
    this.AccountTxnId = builder.accountTxnId
    this.Flags = builder.flags
    this.LastLedgerSequnces = builder.lastLedgerSequence
    this.Memos = builder.memos
    this.Signers = builder.signers
  }
}
