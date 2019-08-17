export default interface AccountLines {
    account: string
    lines: TrustLine[]
    ledger_current_index?: number
    ledger_index?: number
    ledger_hash?: string
    marker?: any
}

export interface TrustLine {
    account: string
    balance: string
    currency: string
    limit: string
    limit_peer: string
    quality_in: number
    quality_out: number
    no_ripple?: boolean
    no_ripple_peer?: boolean
    authorized?: boolean
    peer_authorized?: boolean
    freeze?: boolean
    freeze_peer?: boolean
}