export default class EscrowFinishBuilder {
    private readonly _owner: string
    private readonly _offerSequence: number
    private _condition?: string
    private _fulfillment?: string


    constructor(owner: string, offerSequence: number) {
        this._owner = owner
        this._offerSequence = offerSequence
    }

    build() {
        return this
    }

    setCondition(condition: string) {
        this._condition = condition
        return this
    }

    setFulfillment(fulfillment: string) {
        this._fulfillment = fulfillment
        return this
    }

    get owner() {
        return this._owner
    }

    get offerSequence() {
        return this._offerSequence
    }

    get condition() {
        return this._condition
    }

    get fulfillment() {
        return this._fulfillment
    }
}