export default class EscrowCancellationBuilder {
    private readonly _owner: string
    private readonly _offerSequence: number


    constructor(owner: string, offerSequence: number) {
        this._owner = owner
        this._offerSequence = offerSequence
    }

    build() {
        return this
    }

    get owner() {
        return this._owner
    }

    get offerSequence() {
        return this._offerSequence
    }
}