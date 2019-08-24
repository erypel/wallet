export default interface FeeSettings {
    LedgerEntryType: string
    BaseFee: string
    ReferenceFeeUnits: number
    ReserveBase: number
    ReserveIncrement: number
    Flags: number
}