export default class EscrowCreationBuilder {
    private readonly _amount: string
    private readonly _destination: string
    private _allowCancelAfter?: string
    private _allowExecuteAfter?: string
    private _condition?: string
    private _destinationTag?: number

    constructor(amount: string, destination: string) {
        this._amount = amount
        this._destination = destination
    }

    build() {
        return this
    }

    setAllowCancelAfter(allowCancelAfter: string) {
        this._allowCancelAfter = allowCancelAfter
        return this
    }

    setAllowExecuteAfter(allowExecuteAfter: string) {
        this._allowExecuteAfter = allowExecuteAfter
        return this
    }

    setCondition(condition: string) {
        this._condition = condition
        return this
    }

    setDestinationTag(destinationTag: number) {
        this._destinationTag = destinationTag
        return this
    }

    get amount() {
        return this._amount
    }

    get destination() {
        return this._destination
    }

    get allowCancelAfter() {
        return this._allowCancelAfter
    }

    get allowExecuteAfter() {
        return this._allowExecuteAfter
    }

    get condition() {
        return this._condition
    }

    get destinationTag() {
        return this._destinationTag
    }
}