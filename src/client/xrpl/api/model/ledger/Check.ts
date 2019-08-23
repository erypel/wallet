export default interface Check {
    LedgerEntryType: string
    Account: string
    Destination: string
    Flags: number
    OwnerNode: string
    PreviousTxnID: string
    PreviousTxnLgrSeq: number
    SendMax: string | object
    Sequence: number
    DestinationNode?: string
    DestinationTag?: number
    Expiration?: number
    InvoiceID?: string
    SourceTag?: number
}