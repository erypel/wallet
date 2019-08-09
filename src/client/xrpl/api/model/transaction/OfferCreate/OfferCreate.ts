import Transaction from  '../Transaction'
import { TransactionBuilder } from  '../TransactionBuilder'
import { OfferCreateBuilder } from  './OfferCreateBuilder'
import { IssuerAmount } from '../../Amount'

// Flags

/*
    If enabled, the offer does not consume offers that exactly match it, and 
    instead becomes an Offer object in the ledger. It still consumes offers 
    that cross it.
*/
const tf_PASSIVE = 65536

/*
    Treat the offer as an Immediate or Cancel order . If enabled, the offer 
    never becomes a ledger object: it only tries to match existing offers in
     the ledger. If the offer cannot match any offers immediately, it executes
     'successfully' without trading any currency. In this case, the transaction 
    has the result code tesSUCCESS, but creates no Offer objects in the ledger.
*/
const tf_IMMEDIATE_OR_CANCEL = 131072

/*
    Treat the offer as a Fill or Kill order . Only try to match existing offers
    in the ledger, and only do so if the entire TakerPays quantity can be 
    obtained. If the fix1578 amendment is enabled and the offer cannot be 
    executed when placed, the transaction has the result code tecKILLED; 
    otherwise, the transaction uses the result code tesSUCCESS even when it was
    killed without trading any currency.
*/
const tf_FILL_OR_KILL = 262144

/*
    Exchange the entire TakerGets amount, even if it means obtaining more than 
    the TakerPays amount in exchange.
*/
const tf_SELL = 524288

export const OfferCreateFlags = {
    tf_PASSIVE,
    tf_IMMEDIATE_OR_CANCEL,
    tf_FILL_OR_KILL,
    tf_SELL
}

export default class OfferCreate extends Transaction {
    expiration?: string // time must be since the Ripple Epoch
    offerSequence?: number
    TakerGets: IssuerAmount | string
    TakerPays: IssuerAmount | string


    constructor(transactionBuilder: TransactionBuilder, offerCreateBuilder: OfferCreateBuilder) {
        super(transactionBuilder)
        this.TakerGets = offerCreateBuilder.takerGets
        this.TakerPays = offerCreateBuilder.takerPays
        this.expiration = offerCreateBuilder.expiration
        this.offerSequence = offerCreateBuilder.offerSequence
    }
}