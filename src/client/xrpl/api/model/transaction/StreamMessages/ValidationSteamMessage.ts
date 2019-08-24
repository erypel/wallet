export default interface ValidationStreamMessage {
    type: string
    amendments?: string[]
    base_fee?: number
    flags: number
    full: boolean
    ledger_hash: string
    ledger_index: string | number
    load_fee?: number
    reserve_base?: number
    reserve_inc?: number
    signature: string
    signing_time: number
    validation_public_key: string
}