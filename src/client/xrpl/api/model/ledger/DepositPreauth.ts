export default interface DepositPreauth {
    LedgerEntryType: string
    Account: string
    Authorize: string
    Flags: number
    OwnerNode: string
    PreviousTxnID: string
    PreviousTxnLgrSeq: number
}