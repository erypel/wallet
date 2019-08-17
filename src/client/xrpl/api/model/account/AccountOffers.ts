import { IssuerAmount } from '../Amount'

export default interface AccountOffers {
    account: string
    offers: AccountOffer[]
    ledger_hash?: string
    ledger_current_index?: number
    limit?: number
    marker?: any
}

export interface AccountOffer {
    flags: Set<number>
    quality: string
    seq: number
    taker_gets: string | IssuerAmount
    taker_pays: string | IssuerAmount
    expiration?: number
}