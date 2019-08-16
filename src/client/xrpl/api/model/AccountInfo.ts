import AccountRoot from './AccountRoot'

export default interface AccountInfo {
    account_data: AccountRoot
    signer_lists: []
    ledger_current_index: number
    ledger_index: number
    queue_data: object
    validated: boolean
}