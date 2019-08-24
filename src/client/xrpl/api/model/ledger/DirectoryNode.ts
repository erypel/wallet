export default interface DirectoryNode {
    LedgerEntryType: string
    Flags: number
    RootIndex: string
    Indexes: []
    IndexNext?: number
    IndexPrevious?: number
    Owner?: string
    TakerPaysCurrency?: string
    TakerPaysIssuer?: string
    TakerGetsCurrency?: string
    TakerGetsIssuer?: string
}