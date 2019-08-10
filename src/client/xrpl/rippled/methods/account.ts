import { api_request } from '../Dispatch'

/**
 * Methods for interacting with XRP accounts
 */

/**
 * Get information about the specified account
 * @param account: String, the address of the account to get info on
 * Response looks something like:
 * {
  "id": 1,
  "status": "success",
  "type": "response",
  "result": {
    "account_data": {
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
    "ledger_current_index": 43910817,
    "validated": false
  }
}
 */
function account_info(account: string){
	let json = '{"id": 1,"command": "account_info","account": "' + account + '"}'
	api_request(json)
}

/**
 * Get a list of trust lines connected to an account
 * @param account: String, the address of the account to get trust lines for
 * Response looks like:
 * {
  "id": 2,
  "status": "success",
  "type": "response",
  "result": {
    "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
    "ledger_current_index": 43910895,
    "lines": [
      {
        "account": "r3vi7mWxru9rJCxETCyA1CHvzL96eZWx5z",
        "balance": "0",
        "currency": "ASP",
        "limit": "0",
        "limit_peer": "10",
        "quality_in": 0,
        "quality_out": 0
      },
      ...
    ],
    "validated": false
  }
 */
function account_lines(account: string){
	let json = '{"id": 1,"command": "account_lines","account": "' + account + '", "ledger": "current"}'
	api_request(json)
}

/**
 * Get a list of offers created by an account
 * @param account: String, the address of the account
 * Response looks like:
 * {
  "id": 3,
  "status": "success",
  "type": "response",
  "result": {
    "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
    "ledger_current_index": 43910919,
    "offers": [],
    "validated": false
  }
}
 */
async function account_offers(account: string){
	const json = {"id": `${account}_account_offers`,"command": "account_offers","account": account}
	return await api_request(json)
}

/**
 * Get a list of transactions that applied to a specific account
 * @param account: string, the address of the account
 * @returns something like:
 * {
  "id": 4,
  "status": "success",
  "type": "response",
  "result": {
    "account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
    "ledger_index_max": 43910952,
    "ledger_index_min": 32570,
    "limit": 10,
    "offset": 0,
    "transactions": [
      {
        "meta": {
          "AffectedNodes": [
            {
              "CreatedNode": {
                "LedgerEntryType": "DirectoryNode",
                "LedgerIndex": "4B389454C83BD1C687FBCE6B0FDC6BAD4DABEBEF2E83432E4E11C37937E08000",
                "NewFields": {
                  "ExchangeRate": "4E11C37937E08000",
                  "RootIndex": "4B389454C83BD1C687FBCE6B0FDC6BAD4DABEBEF2E83432E4E11C37937E08000",
                  "TakerPaysCurrency": "0000000000000000000000004254430000000000",
                  "TakerPaysIssuer": "5E7B112523F68D2F5E879DB4EAC51C6698A69304"
                }
              }
            },
            {
              "ModifiedNode": {
                "FinalFields": {
                  "Account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
                  "Balance": "9999999990",
                  "Flags": 0,
                  "OwnerCount": 1,
                  "Sequence": 2
                },
                "LedgerEntryType": "AccountRoot",
                "LedgerIndex": "4F83A2CF7E70F77F79A307E6A472BFC2585B806A70833CCD1C26105BAE0D6E05",
                "PreviousFields": {
                  "Balance": "10000000000",
                  "OwnerCount": 0,
                  "Sequence": 1
                },
                "PreviousTxnID": "B24159F8552C355D35E43623F0E5AD965ADBF034D482421529E2703904E1EC09",
                "PreviousTxnLgrSeq": 16154
              }
            },
            {
              "CreatedNode": {
                "LedgerEntryType": "DirectoryNode",
                "LedgerIndex": "F60ADF645E78B69857D2E4AEC8B7742FEABC8431BD8611D099B428C3E816DF93",
                "NewFields": {
                  "ExchangeRate": "4E11C37937E08000",
                  "RootIndex": "F60ADF645E78B69857D2E4AEC8B7742FEABC8431BD8611D099B428C3E816DF93",
                  "TakerPaysCurrency": "0000000000000000000000004254430000000000",
                  "TakerPaysIssuer": "5E7B112523F68D2F5E879DB4EAC51C6698A69304"
                }
              }
            },
            {
              "CreatedNode": {
                "LedgerEntryType": "Offer",
                "LedgerIndex": "FDB2F7F93640D13069BF495097F971B7138ED69B2BFB9E28C8A3DEF592498651",
                "NewFields": {
                  "Account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
                  "BookDirectory": "4B389454C83BD1C687FBCE6B0FDC6BAD4DABEBEF2E83432E4E11C37937E08000",
                  "Sequence": 1,
                  "TakerGets": "2000000",
                  "TakerPays": {
                    "currency": "BTC",
                    "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
                    "value": "1"
                  }
                }
              }
            }
          ],
          "TransactionIndex": 0,
          "TransactionResult": "tesSUCCESS"
        },
        "tx": {
          "Account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "Fee": "10",
          "Flags": 0,
          "Sequence": 1,
          "SigningPubKey": "02BC8C02199949B15C005B997E7C8594574E9B02BA2D0628902E0532989976CF9D",
          "TakerGets": "2000000",
          "TakerPays": {
            "currency": "BTC",
            "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
            "value": "1"
          },
          "TransactionType": "OfferCreate",
          "TxnSignature": "3045022100A3A1E59ABC619E212AED87E8E72A44FF6F5FB9866668A89EE818FD93CE66C8FB02207A290146B1438D16CE77976602C1E32070974A010A27355D574DF61A5B19E002",
          "date": 411616880,
          "hash": "389720F6FD8A144F171708F9ECB334D704CBCFEFBCDA152D931AC34FB5F9E32B",
          "inLedger": 95405,
          "ledger_index": 95405
        },
        "validated": true
      },
      ...
    ],
    "validated": true
  }
}
 */
function account_tx(account: string){
	let json = '{"id": 4,"command": "account_tx","account": "' + account + '","ledger_index_min": -1,"ledger_index_max": -1,"binary": false,"count": false,"limit": 10,"forward": false}'
	api_request(json)
}

/**
 * Returns a list of currencies that the accound can send or receive
 * @param account: the string representation of the accound address
 * @returns something like: 
 * {
  "id": 5,
  "status": "success",
  "type": "response",
  "result": {
    "ledger_hash": "B17BE47127E65DC47CB21748DC5299A4A14C483C1CE3C5EA03A3DABAEF73573B",
    "ledger_index": 43911014,
    "receive_currencies": [
      "BTC",
      "CNY",
      "DYM",
      "EUR",
      "JOE",
      "MXN",
      "USD",
      "015841551A748AD2C1F76FF6ECB0CCCD00000000"
    ],
    "send_currencies": [
      "ASP",
      "BTC",
      "CHF",
      "CNY",
      "DYM",
      "EUR",
      "JOE",
      "JPY",
      "MXN",
      "USD"
    ],
    "validated": true
  }
}
 */
function account_currencies(account: string){
	let json = '{"id": 5,"command": "account_currencies","account": "' + account + '","strict": true,"ledger_index": "validated","account_index": 0}'
	api_request(json)
}

export const rippledAccount = {
  account_currencies,
  account_tx,
  account_offers,
  account_lines,
  account_info
}
