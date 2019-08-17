import Amount from '../Amount'

export default interface Offer {
    LedgerEntryType: string
    Flags: number
    Account: string
    Sequence: number
    TakerPays: Amount | string
    TakerGets: Amount | string
    BookDirectory: string
    BookNode: string
    OwnerNode: string
    PreviousTxnID: string
    PreviousTxnLgrSeq: number
    Expiraton: number
}

/**
 * The object was placed as a passive offer. This has no effect on the object 
 * in the ledger.
 * 
 * Corresponds to OfferCreate Flag: tfPassive
 */
const lsf_PASSIVE = 65536

/**
 * The object was placed as a sell offer. This has no effect on the object in 
 * the ledger (because tfSell only matters if you get a better rate than you 
 * asked for, which cannot happen after the object enters the ledger).
 * 
 * Corresponds to OfferCreate Flag: tfSell
 */
const lsf_SELL = 131072

export const OfferFlags = {
    lsf_PASSIVE,
    lsf_SELL
}