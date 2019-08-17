export default interface GatewayBalances {
    account: string
    obligations?: object
    balances?: object
    assets?: object
    ledger_hash?: string
    ledger_index?: number
    ledger_current_index?: number
}