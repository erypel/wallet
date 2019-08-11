import connector from './RippledConnector'
import { orderbookService } from '../../services/orderbookService'

const AWAITING = {}
const handleResponse = function(data) {
  if (!data.hasOwnProperty('id')) {
    console.error('Got response event without ID:', data)
    return
  }
  if (AWAITING.hasOwnProperty(data.id)) {
    AWAITING[data.id].resolve(data)
  } else {
    console.error('Response to un-awaited request w/ ID ' + data.id)
  }
}

const handleTransaction = function(tx) {
  const { transaction, meta, ledger_index, validated } = tx
  const { TransactionType, Account } = transaction
  switch(transaction.TransactionType) {
    case 'OfferCreate':
      return orderbookService.handleIncomingOrderCreate(transaction)
  }
  console.log(TransactionType + " transaction sent by " +
              Account +
              "\n  Result: " + meta.TransactionResult +
              " in ledger " + ledger_index +
              "\n  Validated? " + validated)
}

let autoid_n = 0
export function api_request(options) {
  if (!options.hasOwnProperty('id')) {
    options.id = 'autoid_' + (autoid_n++)
  }

  let resolveHolder;
  AWAITING[options.id] = new Promise((resolve, reject) => {
    // Save the resolve func to be called by the handleResponse function later
    resolveHolder = resolve
    try {
      connector.send(JSON.stringify(options))
    } catch(error) {
      reject(error)
    }
  })
  AWAITING[options.id].resolve = resolveHolder;
  return AWAITING[options.id]
}

const WS_HANDLERS = {
  'response': handleResponse,
  'transaction': handleTransaction
  // Fill this out with handlers in the following format:
  // 'type': function(event) { /* handle event of this type */ }
}
connector.addEventListener('message', (event) => {
  const parsed_data = JSON.parse(event.data)
  if (WS_HANDLERS.hasOwnProperty(parsed_data.type)) {
    // Call the mapped handler
    WS_HANDLERS[parsed_data.type](parsed_data)
  } else {
    console.log('Unhandled message from server', event)
  }
})