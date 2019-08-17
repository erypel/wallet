import { TransactionBuilder } from './TransactionBuilder'

export default class Transaction {
  Account: string
  TransactionType: string
  fee?: string
  sequence?: number
  accountTxnId?: string
  flags?: Set<number>
  lastLedgerSequnces?: number
  memos?: object[]
  signers?: object[]
  sourceTag?: number
  signingPubKey?: string
  txnSignature?: string

  constructor(builder: TransactionBuilder) {
    this.Account = builder.account
    this.TransactionType = builder.transactionType
    this.fee = builder.fee
    this.sequence = builder.sequence
    this.accountTxnId = builder.accountTxnId
    this.flags = builder.flags
    this.lastLedgerSequnces = builder.lastLedgerSequence
    this.memos = builder.memos
    this.signers = builder.signers
  }
}
