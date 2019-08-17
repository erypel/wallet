import AccountRoot from './AccountRoot'

export default interface AccountInfo {
    account_data: AccountRoot
    signer_lists?: []
    ledger_current_index?: number
    ledger_index?: number
    queue_data?: QueueData
    validated: boolean
}

export interface QueueData {
    txn_count: number
    auth_change_queued?: boolean
    lowest_sequence?: number
    highest_sequence?: number
    max_spend_drops_total?: string
    transactions?: TransactionInfo[]
}

export interface TransactionInfo {
    auth_change: boolean
    fee: string
    fee_level: string
    max_spend_drops: string
    seq: number
}