export default interface AccountChannels {
    account: string
    channels: Channel[]
    ledger_hash: string
    ledger_index: number
    validated?: boolean
    limit?: number
    marker?: any
}

export interface Channel {
    account: string
    amount: string
    balance: string
    channel_id: string
    destination_account: string
    public_key?: string
    public_key_hex?: string
    settle_delay?: number
    expiration?: number
    cancel_after?: number
    source_tag?: number
    destination_tag?: number
}