import formatBidsAndAsks from './formatBidsAndAsks'
import { AsksAndBids } from '../model/transaction/Orderbook/Orderbook'
import { orderbookService } from '../../../services/orderbookService'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

const account = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq' // Replace with the account you want notifications for

export default async function subscribeToBook(takerPays: string, takerGets: string, issuer: string = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'/**Gatehub USD*/): Promise<AsksAndBids> {
    return await api.connect().then(async () => { // Omit this if you are already connected

    api.connection.on('transaction', (tx: any) => {
        const { transaction, meta, ledger_index, validated } = tx
        const { TransactionType, Account } = transaction
        switch(transaction.TransactionType) {
            case 'OfferCreate':
              return orderbookService.handleIncomingOrderCreate(transaction)
            case 'OfferCancel':
              return orderbookService.handleIncomingOrderCancel(transaction)
        }
        console.log(TransactionType + " transaction sent by " +
                    Account +
                    "\n  Result: " + meta.TransactionResult +
                    " in ledger " + ledger_index +
                    "\n  Validated? " + validated)
    })

    return await api.request('subscribe', {
        books: [ 
            {taker_pays: {currency: takerPays}, taker_gets: {currency: takerGets, issuer: issuer}, snapshot: true, both: true},
            {taker_pays: {currency: takerGets, issuer: issuer}, taker_gets: {currency: takerPays}, snapshot: true, both: true}
         ]
    }).then(async (result: AsksAndBids) => {
        const orderbookInfo = {
            "base": {
              "currency": takerPays,
              "counterparty": issuer
            },
            "counter": {
              "currency": takerGets,
              "counterparty": issuer
            }
          }
        const directOffers = (result? result.asks : [])
        const reverseOffers = (result? result.bids : [])
        const orderbook = await formatBidsAndAsks(orderbookInfo, [...directOffers])
        console.log('lookey tado', orderbook)
        return orderbook
    }).catch((error: any) => {
        console.log(error)
    })
    })
}
  