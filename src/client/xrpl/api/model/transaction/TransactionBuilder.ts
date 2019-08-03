import Transaction from './Transaction'

export type TransactionType = 'Payment' | 'OfferCreate' | 'OfferCancel' |
    'TrustSet' | 'AccountSet' | 'SetRegularKey' | 'SignerListSet' | 'EscrowCreate' 
    | 'EscrowFinish' | 'EscrowCancel' | 'PaymentChannelCreate' | 'PaymentChannelFund'
    | 'PaymentChannelClaim' | 'DepositPreauth'

export class TransactionBuilder {
    private readonly _account: string
    private readonly _transactionType: TransactionType
    private _fee?: string
    private _sequence?: number
    private _accountTxnId?: string
    private _flags?: Set<number>
    private _lastLedgerSequence?: number
    private _signers?: object[]
    private _sourceTag?: number
    private _memos?: object[]

    constructor(account: string, transactionType: TransactionType) {
        this._account = account
        this._transactionType = transactionType
    }

    build() {
        return new Transaction(this)
    }

    setFee(fee: string) {
        this._fee = fee
        return this
    }

    setSequence(sequence: number) {
        this._sequence = sequence
        return this
    }

    setAccountTxnId(accountTxnId: string) {
        this._accountTxnId = accountTxnId
        return this
    }

    setFlags(...flags: number[]) {
        this._flags = new Set(flags)
        return this
    }

    setLastLedgerSequence(lastLedgerSequence: number) {
        this._lastLedgerSequence = lastLedgerSequence
        return this
    }

    setSigners(...signers: object[]) {
        this._signers = signers
        return this
    }

    setSourceTag(sourceTag: number) {
        this._sourceTag = sourceTag
        return this
    }

    setMemos(...memos: object[]){
        this._memos = memos
    }
    
    get account() {
        return this._account
    }

    get transactionType() {
        return this._transactionType
    }

    get fee() {
        return this._fee
    }

    get sequence() {
        return this._sequence
    }

    get accountTxnId() {
        return this._accountTxnId
    }

    get flags() {
        return this._flags
    }

    get lastLedgerSequence() {
        return this._lastLedgerSequence
    }

    get signers() {
        return this._signers
    }

    get sourceTag() {
        return this._sourceTag
    }

    get memos() {
        return this._memos
    }
}