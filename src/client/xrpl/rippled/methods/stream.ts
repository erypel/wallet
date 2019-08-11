import { api_request } from '../Dispatch'
import formatBidsAndAsks from '../../api/utils/formatBidsAndAsks'

/**
 * Methods for subscribing and unsubscribing to streams
 */

/**
 * Start receiving selected streams from the server
 * @param accounts: (optional) Array with the unique base58 addresses of accounts to monitor for 
 * validated transactions. The server sends a notification for any transaction that affects at 
 * least one of these accounts.
 * 
 * Response looks like:
 * {
  "id": 1,
  "status": "success",
  "type": "response",
  "result": {
    "fee_base": 10,
    "fee_ref": 10,
    "hostid": "ROWE",
    "ledger_hash": "839643494C0019FCC882C0ED371F42478F65B5E69AABA44400C9AE2D026BC5CF",
    "ledger_index": 43910395,
    "ledger_time": 598918271,
    "load_base": 256,
    "load_factor": 256,
    "pubkey_node": "n9LbkoB9ReSbaA9SGL317fm6CvjLcFG8hGoierLYfwiCDsEXHcP3",
    "random": "1D13098D5CFF237F907D3E69D1F87DD6AB4D754868AB4E7400710C6AEBB92857",
    "reserve_base": 20000000,
    "reserve_inc": 5000000,
    "server_status": "full",
    "validated_ledgers": "32570-43910395"
  }
}
 */
async function subscribeToAccounts(...accounts: string[]){
	if(!accounts) {
		accounts = []
  }
	const json = '{"id": 1, "command": "subscribe", "accounts":'+ accounts +',"streams": ["server", "ledger"]}'
	await api_request(json)
}

async function subscribeToBook(takerPays: string, takerGets: string, issuer: string = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'/**Gatehub USD*/) {
  const directOfferResultsJson = {"id": "direct", "command": "subscribe", "books": [{"taker_pays": {"currency": takerPays}, "taker_gets": {"currency": takerGets, "issuer": issuer}, "snapshot": true, "both": true}]}
  const reverseOfferResultsJson = {"id": "reverse", "command": "subscribe", "books": [{"taker_pays": {"currency": takerGets, "issuer": issuer}, "taker_gets": {"currency": takerPays}, "snapshot": true, "both": true}]}
  
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

  return await Promise.all(
    [
      await api_request(directOfferResultsJson),
      await api_request(reverseOfferResultsJson)
    ]
  ).then(async ([directOfferResults, reverseOfferResults]) => {
    const directOffers = (directOfferResults? directOfferResults.result.asks : [])
    const reverseOffers = (reverseOfferResults? reverseOfferResults.result.bids : [])
    const orderbook = await formatBidsAndAsks(orderbookInfo, [...directOffers, ...reverseOffers])
    console.log('lookey', orderbook)
    return orderbook
  })
}

/**
 * Stop receiving selected streams from the server
 * @param accounts: (optional) Array with the unique base58 addresses of accounts to monitor for 
 * validated transactions. The server sends a notification for any transaction that affects at 
 * least one of these accounts.
 * 
 * Response looks like:
 * {
  "id": 2,
  "status": "success",
  "type": "response",
  "result": {}
}
 */
async function unsubscribeFromAccounts(...accounts: string[]){
	if(!accounts) {
		accounts = []
  }
	const json = '{"id": 1, "command": "unsubscribe", "accounts":'+ accounts +',"streams": ["server", "ledger"]}'
	await api_request(json)
}

export const rippledStream = {
  subscribeToAccounts,
  subscribeToBook,
  unsubscribeFromAccounts
}
