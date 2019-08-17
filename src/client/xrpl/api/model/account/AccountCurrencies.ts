export default interface AccountCurrencies {
    ledger_hash?: string
    ledger_index: number
    receive_currencies: string[]
    send_currencies: string[]
    validated: boolean
}