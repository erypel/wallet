import Source from "../Source";
import Destination from "../Destination";
import Payment from "./Payment";

export class TransactionBuilder {
    private source?: Source = undefined
    private destination?: Destination = undefined
    private allowPartialPayment?: boolean = undefined
    private invoiceId?: string = undefined
    private limitQuality?: boolean = undefined
    //private memos?: Memos[]
    private noDirectRipple?: boolean = undefined
    private paths?: string = undefined

    constructor() {

    }

    buildPayment() {
        return new Payment(this)
    }

    withSource(source: Source) {
        this.source = source
        return this
    }

    withDestination(destination: Destination) {
        this.destination = destination
        return this
    }

    setAllowPartialPayment() {
        this.allowPartialPayment = true
        return this
    }

    withInvoiceId(id: string) {
        this.invoiceId = id
        return this
    }

    setLimitQuality() {
        this.limitQuality = true
        return this
    }

    // withMemos() {

    // }

    setNoDirectRipple() {
        this.noDirectRipple = true
        return this
    }

    withPaths(paths: string) {
        this.paths = paths
        return this
    }
}