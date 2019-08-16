import formatBidsAndAsks from './formatBidsAndAsks'
import { AsksAndBids } from '../model/transaction/Orderbook/Orderbook'
import { orderbookService } from '../../../services/orderbookService'
import { issuers } from './issuers'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function subscribeToBook(takerPays: string, takerGets: string): Promise<AsksAndBids> {
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

    const takerGetsIssuer = issuers[takerGets][0]
    const takerPaysIssuer = issuers[takerPays][0] //TODO
    
    return await api.request('subscribe', {
        books: [ 
            {taker_pays: {currency: takerPays, issuer: takerPaysIssuer}, taker_gets: {currency: takerGets, issuer: takerGetsIssuer}, snapshot: true, both: true},
            {taker_pays: {currency: takerGets, issuer: takerGetsIssuer}, taker_gets: {currency: takerPays, issuer: takerPaysIssuer}, snapshot: true, both: true}
         ]
    }).then(async (result: AsksAndBids) => {
        const orderbookInfo = {
            "base": {
              "currency": takerPays,
              "counterparty": takerPaysIssuer
            },
            "counter": {
              "currency": takerGets,
              "counterparty": takerGetsIssuer
            }
          }
        const directOffers = (result? result.asks : [])
        //const reverseOffers = (result? result.bids : [])
        const orderbook = await formatBidsAndAsks(orderbookInfo, [...directOffers])
        console.log('lookey tado', orderbook)
        return orderbook
      }).catch((error: any) => {
          console.log(error)
      })
    })
}
  