import { IssuerAmount } from '../../api/model/Amount'

export default interface Offer {
    flags: Set<number>
    quality: string
    seq: number
    takerGets: string | IssuerAmount
    takerPays: string | IssuerAmount
    expiration?: number
}