import { IssuerAmount } from '../Amount'

export default interface AccountOffers {
    account: string
    offers: Offer[]
    ledger_hash?: string
    ledger_current_index?: number
    limit?: number
    marker?: any
}

export interface Offer {
    flags: Set<number>
    quality: string
    seq: number
    taker_gets: string | IssuerAmount
    taker_pays: string | IssuerAmount
    expiration?: number
}