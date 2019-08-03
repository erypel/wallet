import Payment from './Payment'
import { TransactionBuilder } from '../TransactionBuilder'
import Amount from '../../Amount'

export class PaymentBuilder {
    private _amount: Amount | string
    private readonly _destination: string
    private _destinationTag?: number = undefined
    private _invoiceId?: string = undefined
    private _paths?: string = undefined
    private _sendMax?: Amount = undefined
    private _deliverMin?: Amount = undefined

    constructor(amount: Amount, destination: string) {
        if (amount.currency === 'XRP') {
            this._amount = amount.value
        } else {
            this._amount = amount
        }
        this._destination = destination
    }

    build(transactionBuilder: TransactionBuilder) {
        return new Payment(transactionBuilder, this)
    }

    setDestinationTag(destinationTag: number) {
        this._destinationTag = destinationTag
        return this
    }

    withInvoiceId(id: string) {
        this._invoiceId = id
        return this
    }

    setSendMax(sendMax: Amount) {
        this._sendMax = sendMax
        return this
    }

    setDeliverMin(deliverMin: Amount) {
        this._deliverMin = deliverMin
        return this
    }

    withPaths(paths: string) {
        this._paths = paths
        return this
    }

    get sendMax() {
        return this._sendMax
    }

    get deliverMin() {
        return this._deliverMin
    }

    get destination() {
        return this._destination
    }

    get invoiceId() {
        return this._invoiceId
    }

    get destinationTag() {
        return this._destinationTag
    }

    get amount() {
        return this._amount
    }

    get paths() {
        return this._paths
    }
}