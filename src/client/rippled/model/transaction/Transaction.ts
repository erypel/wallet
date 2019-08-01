import Instructions from '../Instructions'
import { TransactionBuilder } from './TransactionBuilder';

export default class Transaction {
  account: string
  transactionType: string
  fee: string
  sequence: number
  accountTxnId?: string
  flags?: number
  lastLedgerSequnces?: number
  memos?: object[]
  signers?: object[]
  sourceTag?: number
  signingPubKey?: string
  txnSignature?: string

  constructor(builder: TransactionBuilder) {

  }

  // prepare(address: string, transaction: string, instructions?: Instructions): Promise<object>

  // toJsonObject(): string
  // TODO these go somewhere else
  // sign() {
  //   //TODO
  // }

  // function submit() {

  // }

  // function verify() {
    
  // }
}
