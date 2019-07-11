import Source from "../Source";
import Destination from "../Destination";
import Payment from "./Payment";

export class TransactionBuilder {
    private readonly _source: Source
    private readonly _destination: Destination
    private _allowPartialPayment?: boolean = undefined
    private _invoiceId?: string = undefined
    private _limitQuality?: boolean = undefined
    //privat_e memos?: Memos[]
    private _noDirectRipple?: boolean = undefined
    private _paths?: string = undefined

    constructor(source: Source, destination: Destination) {
        this._source = source
        this._destination = destination
    }

    //TODO this will take in a type when we have more transaction types
    build() {
        return new Payment(this)
    }

    setAllowPartialPayment() {
        this._allowPartialPayment = true
        return this
    }

    withInvoiceId(id: string) {
        this._invoiceId = id
        return this
    }

    setLimitQuality() {
        this._limitQuality = true
        return this
    }

    // withMemos() {

    // }

    setNoDirectRipple() {
        this._noDirectRipple = true
        return this
    }

    withPaths(paths: string) {
        this._paths = paths
        return this
    }

    get source() {
        return this._source
    }

    get destination() {
        return this._destination
    }

    get allowPartialPayment() {
        return this._allowPartialPayment
    }

    get invoiceId() {
        return this._invoiceId
    }

    get limitQuality() {
        return this._limitQuality
    }

    get noDirectRipple() {
        return this._noDirectRipple
    }

    get paths() {
        return this._paths
    }
}