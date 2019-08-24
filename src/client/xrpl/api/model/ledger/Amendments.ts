export default interface Amendments {
    Amendments?: string[]
    Majorities?: Majority[]
    Flags: number
    LedgerEntryType: string
}

export interface Majority {
    Amendment: string
    CloseTime: number
}