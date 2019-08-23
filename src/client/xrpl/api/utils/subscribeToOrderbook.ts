import formatBidsAndAsks from './formatBidsAndAsks'
import { AsksAndBids } from '../model/transaction/Orderbook/Orderbook'
import { issuers } from './issuers'
import { autoBridge } from './autobridge'
import handleIncomingTransaction from './handleIncomingTransaction'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function subscribeToBook(takerPays: string, takerGets: string): Promise<AsksAndBids> {
    return await api.connect().then(async () => { 
      api.connection.on('transaction', (tx: any) => {
          handleIncomingTransaction(tx)
      })
    
      if(takerPays === 'XRP' || takerGets === 'XRP') {
        return await doSubscription(takerGets, takerPays)
      } else {
        const leftBook = await doSubscription(takerGets, 'XRP')
        const rightBook = await doSubscription('XRP', takerPays)
        return await autoBridge(takerGets, takerPays, leftBook, rightBook)
      }
  })
}



async function doSubscription(takerGets: string, takerPays: string): Promise<AsksAndBids> {
  const takerGetsIssuer = issuers[takerGets][0]
  const takerPaysIssuer = issuers[takerPays][0]

  return await api.request('subscribe', {
    books: [ 
        {
          taker_pays: {currency: takerPays, issuer: takerPaysIssuer}, 
          taker_gets: {currency: takerGets, issuer: takerGetsIssuer}, 
          snapshot: true, 
          both: true
        },
        {
          taker_pays: {currency: takerGets, issuer: takerGetsIssuer}, 
          taker_gets: {currency: takerPays, issuer: takerPaysIssuer}, 
          snapshot: true, 
          both: true
        }
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
}