import { IssuerAmount } from '../../Amount';

export default class TrustSetBuilder {
    private readonly _limitAmount: IssuerAmount
    private _qualityIn?: number
    private _qualityOut?: number

    constructor(limitAmount: IssuerAmount) {
        this._limitAmount = limitAmount
    }

    setQualityIn(qualityIn: number) {
        this._qualityIn = qualityIn
        return this
    }

    setQualityOut(qualityOut: number) {
        this._qualityOut = qualityOut
        return this
    }

    get limitAmount() {
        return this._limitAmount
    }

    get qualityIn() {
        return this._qualityIn
    }

    get qualityOut() {
        return this._qualityOut
    }
}