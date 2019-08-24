import Amount from '../Amount'

export default interface TransactionMetadata {
    AffectedNodes: AffectedNode[]
    DeliveredAmount?: Amount
    TransactionIndex: number
    TransactionResult: string
    delivered_amount?: Amount
}

export type NodeTypes = CreatedNode | DeletedNode | ModifiedNode

export interface AffectedNode {
    CreatedNode?: CreatedNode
    DeletedNode?: DeletedNode
    ModifiedNode?: ModifiedNode
}

export interface CreatedNode {
    LedgerEntryType: string
    LedgerIndex: string
    NewFields: any
}

export interface DeletedNode {
    LedgerEntryType: string
    LedgerIndex: string
    FinalFields: any
}

export interface ModifiedNode {
    LedgerEntryType: string
    LedgerIndex: string
    FinalFields: any
    PreviousFields: any
    PreviousTxnID?: string
    PreviousTxnLgrSeq?: number
}