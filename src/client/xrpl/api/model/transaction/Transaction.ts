import { TransactionBuilder } from './TransactionBuilder'
import Payment from './Payment/Payment'
import TrustSet from './TrustSet/TrustSet'
import OrderCancellation from './OrderCancellation/OrderCancellation'
import OrderCreate from './OrderCreate/OrderCreate'
import EscrowCancel from './Escrow/EscrowCancel'
import EscrowFinish from './Escrow/EscrowFinish'
import EscrowCreate from './Escrow/EscrowCreate'
import AccountSet from './AccountSet/AccountSet'

export type TransactionTypes = AccountSet | EscrowCreate | EscrowCancel 
  | EscrowFinish | OrderCreate | Payment | TrustSet | OrderCancellation

export default class Transaction {
  Account: string
  TransactionType: string
  date?: number
  Fee?: string
  Sequence?: number
  AccountTxnId?: string
  Flags?: Set<number>
  LastLedgerSequence?: number
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
    this.LastLedgerSequence = builder.lastLedgerSequence
    this.Memos = builder.memos
    this.Signers = builder.signers
  }
}
