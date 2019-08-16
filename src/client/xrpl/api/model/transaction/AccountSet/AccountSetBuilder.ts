export default class AccountSetBuilder {
    private _clearFlag?: number
    private _domain?: string
    private _emailHash?: string
    private _messageKey?: string
    private _setFlag?: number
    private _transferRate?: number
    private _tickSize?: number
    private _walletLocator?: string
    private _walletSize?: number

    build() {
        return this
    }

    setClearFlag(clearFlag: number) {
        this._clearFlag = clearFlag
        return this
    }

    setDomain(domain: string) {
        this._domain = domain
        return this
    }

    setEmailHash(emailHash: string) {
        this._emailHash = emailHash
        return this
    }

    setMessageKey(messageKey: string) {
        this._messageKey = messageKey
        return this
    }

    setSetFlag(setFlag: number) {
        this._setFlag = setFlag
        return this
    }

    setTransferRate(transferRate: number) {
        this._transferRate = transferRate
        return this
    }

    setTickSize(tickSize: number) {
        this._tickSize = tickSize
        return this
    }

    setWalletLocator(walletLocator: string) {
        this._walletLocator = walletLocator
        return this
    }

    setWalletSize(walletSize: number) {
        this._walletSize = walletSize
        return this
    }

    get clearFlag() {
        return this._clearFlag
    }

    get domain() {
        return this._domain
    }

    get emailHash() {
        return this._emailHash
    }

    get messageKey() {
        return this._messageKey
    }

    get setFlag() {
        return this._setFlag
    }

    get transferRate() {
        return this._transferRate
    }

    get tickSize() {
        return this._tickSize
    }

    get walletLocator() {
        return this._walletLocator
    }

    get walletSize() {
        return this._walletSize
    }
}