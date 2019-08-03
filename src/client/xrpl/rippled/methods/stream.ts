import connector from '../RippledConnector';

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
function subscribeToAccounts(...accounts: string[]){
	if(!accounts) {
		accounts = []
  }
	let json = '{"id": 1, "command": "subscribe", "accounts":'+ accounts +',"streams": ["server", "ledger"]}'
	connector.send(json)
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
function unsubscribeFromAccounts(...accounts: string[]){
	if(!accounts) {
		accounts = []
  }
	let json = '{"id": 1, "command": "unsubscribe", "accounts":'+ accounts +',"streams": ["server", "ledger"]}'
	connector.send(json)
}

export const rippledStream = {
  subscribeToAccounts,
  unsubscribeFromAccounts
}
