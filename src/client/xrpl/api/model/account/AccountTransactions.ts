export default interface AccountTransactions {
    account: string
    ledger_index_min: number
    ledger_index_max: number
    limit: number
    marker?: any
    transactions: AccountTransaction[]
    validated?: boolean
}

export interface AccountTransaction {
    ledger_index: number
    meta: object | string
    tx?: object
    tx_blob?: string
    validated: boolean
}