export default interface LedgerHashes {
    LedgerEntryType: string
    LastLedgerSequence: number
    Hashes: string[]
    Flags: number
    index?: string
}