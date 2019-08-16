export default interface AccountRoot {
    LedgerEntryType: string
    Account: string
    Balance: string
    Flags: Set<number>
    OwnerCount: number
    PreviousTxnID: string
    PreviousTxnLgrSeq: number
    Sequence: number
    AccountTxnID?: string
    Domain?: string
    EmailHash?: string
    MessageKey?: string
    RegularKey?: string
    TickSize?: number
    TransferRate?: number
    WalletLocator?: string
    WalletSize?: number
}