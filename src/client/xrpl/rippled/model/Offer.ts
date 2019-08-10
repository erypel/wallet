import { IssuerAmount } from '../../api/model/Amount'

export default interface Offer {
    flags: Set<number>
    quality: string
    seq: number
    taker_gets: string | IssuerAmount
    taker_pays: string | IssuerAmount
    expiration?: number
}