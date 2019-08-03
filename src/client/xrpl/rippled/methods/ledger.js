/**
 * Methods for interacting with XRP ledger
 */

/**
 * Returns ledger information
 * Response looks something like:
 * {
  "id": 1,
  "status": "success",
  "type": "response",
  "result": {
    "closed": {
      "ledger": {
        "accepted": true,
        "account_hash": "42F02BA4712835C430281A5897F0DF9660823018EE55D5E4992BF1C3F1DB1536",
        "close_flags": 0,
        "close_time": 598918721,
        "close_time_human": "2018-Dec-23 22:18:41.000000000",
        "close_time_resolution": 10,
        "closed": true,
        "hash": "65A7103A9A6D924730FFCE3486E20511E15B1C17FD522CCE0B10CBCAC8EB0C23",
        "ledger_hash": "65A7103A9A6D924730FFCE3486E20511E15B1C17FD522CCE0B10CBCAC8EB0C23",
        "ledger_index": "43910513",
        "parent_close_time": 598918720,
        "parent_hash": "B318638DCA6646077792CE9F9C095EC655FA5F7657578D62BE515DBE8352E72C",
        "seqNum": "43910513",
        "totalCoins": "99991731485834280",
        "total_coins": "99991731485834280",
        "transaction_hash": "3D75A52D92496476C3440193BB77E8463B2BE85BFB56A9BBBEE506A90BEE4D3E"
      }
    },
    "open": {
      "ledger": {
        "closed": false,
        "ledger_index": "43910514",
        "parent_hash": "65A7103A9A6D924730FFCE3486E20511E15B1C17FD522CCE0B10CBCAC8EB0C23",
        "seqNum": "43910514"
      }
    }
  }
}
 */
function ledger(){
	let json = '{"id": 3,"command": "ledger","full": false,"expand": false,"transactions": true,"accounts": true}';
	webSocket.send(json);
}

/**
 * Get the most recent closed ledger index
 * Response looks something like:
 * {
  "id": 2,
  "status": "success",
  "type": "response",
  "result": {
    "ledger_hash": "133646CCA65F84687F98D4E9E913FFB55501E9E0DC1DE3E87B23EA99A5DC23F6",
    "ledger_index": 43910526
  }
}
 */
function ledger_closed(){
	let json = '{"id": 2,"command": "ledger_closed"}';
	webSocket.send(json);
}

/**
 * Get the current in-progress ledger index
 * Response looks something like:
 * {
  "id": 3,
  "status": "success",
  "type": "response",
  "result": {
    "ledger_current_index": 43910549
  }
}
 */
function ledger_current(){
	let json = '{"id": 3,"command": "ledger_current"}';
	webSocket.send(json);	
}

/**
 * Get a single node from the ledger
 * @param account_root: String(address) (Optional) Specify an AccountRoot object to retrieve.
 * Response looks something like:
 * {
  "id": 1,
  "status": "success",
  "type": "response",
  "result": {
    "index": "4F83A2CF7E70F77F79A307E6A472BFC2585B806A70833CCD1C26105BAE0D6E05",
    "ledger_hash": "D31EECA7195EC3DF51C4EC0A7F268F2AAAD3951AC99B5809104BD5F6DDEC7238",
    "ledger_index": 43910613,
    "node": {
      "Account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
      "Balance": "13314753787",
      "Flags": 0,
      "LedgerEntryType": "AccountRoot",
      "OwnerCount": 17,
      "PreviousTxnID": "5A18ACA848D7786E2AC27A2FFB54483F2B6367B4375A4AE00D6DCC60B668D0BD",
      "PreviousTxnLgrSeq": 42135765,
      "Sequence": 1406,
      "index": "4F83A2CF7E70F77F79A307E6A472BFC2585B806A70833CCD1C26105BAE0D6E05"
    },
    "validated": true
  }
}
 */
function ledger_entry(account_root){
	if(!account_root)
		account_root = "";
	let json = '{"id": 1,"command": "ledger_entry","type": "account_root","account_root": "'+ account_root +'","ledger_index": "validated"}';
	webSocket.send(json);
}