export default interface AccountObjects {
    account: string
    account_objects: []
    ledger_hash?: string
    ledger_current_index?: number
    limit?: number
    marker?: any
    validated?: boolean
}