// transaction Methods

/**
 * Get information about a specified transaction
 * @param txn_hash
 * @returns something like:
 * {
  "id": 6,
  "status": "success",
  "type": "response",
  "result": {
    "ledger_hash": "195F62F34EB2CCFA4C5888BA20387E82EB353DDB4508BAE6A835AF19FB8B0C09",
    "ledger_index": 348734,
    "metadata": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
              "Balance": "59328999119",
              "Flags": 0,
              "OwnerCount": 11,
              "Sequence": 89
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "E0D7BDE68B468FF0B8D948FD865576517DA987569833A05374ADB9A72E870A06",
            "PreviousFields": {
              "Balance": "59328999129",
              "Sequence": 88
            },
            "PreviousTxnID": "C26AA6B4F7C3B9F55E17CD0D11F12032A1C7AD2757229FFD277C9447A8815E6E",
            "PreviousTxnLgrSeq": 348700
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Balance": {
                "currency": "USD",
                "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
                "value": "-1"
              },
              "Flags": 131072,
              "HighLimit": {
                "currency": "USD",
                "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
                "value": "100"
              },
              "HighNode": "0000000000000000",
              "LowLimit": {
                "currency": "USD",
                "issuer": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
                "value": "0"
              },
              "LowNode": "0000000000000000"
            },
            "LedgerEntryType": "RippleState",
            "LedgerIndex": "EA4BF03B4700123CDFFB6EB09DC1D6E28D5CEB7F680FB00FC24BC1C3BB2DB959",
            "PreviousFields": {
              "Balance": {
                "currency": "USD",
                "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
                "value": "0"
              }
            },
            "PreviousTxnID": "53354D84BAE8FDFC3F4DA879D984D24B929E7FEB9100D2AD9EFCD2E126BCCDC8",
            "PreviousTxnLgrSeq": 343570
          }
        }
      ],
      "TransactionIndex": 0,
      "TransactionResult": "tesSUCCESS"
    },
    "tx_json": {
      "Account": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
      "Amount": {
        "currency": "USD",
        "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
        "value": "1"
      },
      "Destination": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
      "Fee": "10",
      "Flags": 0,
      "Paths": [
        [
          {
            "account": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
            "currency": "USD",
            "issuer": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
            "type": 49,
            "type_hex": "0000000000000031"
          }
        ],
        [
          {
            "account": "rD1jovjQeEpvaDwn9wKaYokkXXrqo4D23x",
            "currency": "USD",
            "issuer": "rD1jovjQeEpvaDwn9wKaYokkXXrqo4D23x",
            "type": 49,
            "type_hex": "0000000000000031"
          },
          {
            "account": "rB5TihdPbKgMrkFqrqUC3yLdE8hhv4BdeY",
            "currency": "USD",
            "issuer": "rB5TihdPbKgMrkFqrqUC3yLdE8hhv4BdeY",
            "type": 49,
            "type_hex": "0000000000000031"
          },
          {
            "account": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
            "currency": "USD",
            "issuer": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
            "type": 49,
            "type_hex": "0000000000000031"
          }
        ]
      ],
      "SendMax": {
        "currency": "USD",
        "issuer": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
        "value": "1.01"
      },
      "Sequence": 88,
      "SigningPubKey": "02EAE5DAB54DD8E1C49641D848D5B97D1B29149106174322EDF98A1B2CCE5D7F8E",
      "TransactionType": "Payment",
      "TxnSignature": "30440220791B6A3E036ECEFFE99E8D4957564E8C84D1548C8C3E80A87ED1AA646ECCFB16022037C5CAC97E34E3021EBB426479F2ACF3ACA75DB91DCC48D1BCFB4CF547CFEAA0",
      "hash": "E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7"
    },
    "validated": true
  }
}
 */
function transaction_entry(txn_hash){
	if(!txn_hash)
		return "Please supply transaction hash";
	let json = '{"id": 6,"command": "transaction_entry","tx_hash": "' + txn_hash + '","ledger_index": 348734}';
	webSocket.send(json);
}

/**
 * Returns information about the specified transaction
 * Response is something like:
 * {
  "id": 7,
  "status": "success",
  "type": "response",
  "result": {
    "Account": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
    "Amount": {
      "currency": "USD",
      "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
      "value": "1"
    },
    "Destination": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
    "Fee": "10",
    "Flags": 0,
    "Paths": [
      [
        {
          "account": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
          "currency": "USD",
          "issuer": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
          "type": 49,
          "type_hex": "0000000000000031"
        }
      ],
      [
        {
          "account": "rD1jovjQeEpvaDwn9wKaYokkXXrqo4D23x",
          "currency": "USD",
          "issuer": "rD1jovjQeEpvaDwn9wKaYokkXXrqo4D23x",
          "type": 49,
          "type_hex": "0000000000000031"
        },
        {
          "account": "rB5TihdPbKgMrkFqrqUC3yLdE8hhv4BdeY",
          "currency": "USD",
          "issuer": "rB5TihdPbKgMrkFqrqUC3yLdE8hhv4BdeY",
          "type": 49,
          "type_hex": "0000000000000031"
        },
        {
          "account": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
          "currency": "USD",
          "issuer": "r3kmLJN5D28dHuH8vZNUZpMC43pEHpaocV",
          "type": 49,
          "type_hex": "0000000000000031"
        }
      ]
    ],
    "SendMax": {
      "currency": "USD",
      "issuer": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
      "value": "1.01"
    },
    "Sequence": 88,
    "SigningPubKey": "02EAE5DAB54DD8E1C49641D848D5B97D1B29149106174322EDF98A1B2CCE5D7F8E",
    "TransactionType": "Payment",
    "TxnSignature": "30440220791B6A3E036ECEFFE99E8D4957564E8C84D1548C8C3E80A87ED1AA646ECCFB16022037C5CAC97E34E3021EBB426479F2ACF3ACA75DB91DCC48D1BCFB4CF547CFEAA0",
    "date": 416445410,
    "hash": "E08D6E9754025BA2534A78707605E0601F03ACE063687A0CA1BDDACFCD1698C7",
    "inLedger": 348734,
    "ledger_index": 348734,
    "meta": {
      "AffectedNodes": [
        {
          "ModifiedNode": {
            "FinalFields": {
              "Account": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
              "Balance": "59328999119",
              "Flags": 0,
              "OwnerCount": 11,
              "Sequence": 89
            },
            "LedgerEntryType": "AccountRoot",
            "LedgerIndex": "E0D7BDE68B468FF0B8D948FD865576517DA987569833A05374ADB9A72E870A06",
            "PreviousFields": {
              "Balance": "59328999129",
              "Sequence": 88
            },
            "PreviousTxnID": "C26AA6B4F7C3B9F55E17CD0D11F12032A1C7AD2757229FFD277C9447A8815E6E",
            "PreviousTxnLgrSeq": 348700
          }
        },
        {
          "ModifiedNode": {
            "FinalFields": {
              "Balance": {
                "currency": "USD",
                "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
                "value": "-1"
              },
              "Flags": 131072,
              "HighLimit": {
                "currency": "USD",
                "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
                "value": "100"
              },
              "HighNode": "0000000000000000",
              "LowLimit": {
                "currency": "USD",
                "issuer": "r3PDtZSa5LiYp1Ysn1vMuMzB59RzV3W9QH",
                "value": "0"
              },
              "LowNode": "0000000000000000"
            },
            "LedgerEntryType": "RippleState",
            "LedgerIndex": "EA4BF03B4700123CDFFB6EB09DC1D6E28D5CEB7F680FB00FC24BC1C3BB2DB959",
            "PreviousFields": {
              "Balance": {
                "currency": "USD",
                "issuer": "rrrrrrrrrrrrrrrrrrrrBZbvji",
                "value": "0"
              }
            },
            "PreviousTxnID": "53354D84BAE8FDFC3F4DA879D984D24B929E7FEB9100D2AD9EFCD2E126BCCDC8",
            "PreviousTxnLgrSeq": 343570
          }
        }
      ],
      "TransactionIndex": 0,
      "TransactionResult": "tesSUCCESS",
      "delivered_amount": "unavailable"
    },
    "validated": true
  }
}
 */
function tx(txn){
	if(!txn)
		return "Please supply transaction";
	let json = '{"id": 7,"command": "tx","transaction": "' + txn + '"}';
	webSocket.send(json);
}

/**
 * Returns the last N transactions starting from start index, in descending order, by ledger 
 * sequence number. Server sets N.
 * @param start_idx
 * @returns to see what is returned, go here: https://developers.ripple.com/websocket-api-tool.html#tx_history
 */
function tx_history(start_idx){
	if(!start_idx)
		return "Please supply a starting index";
	let json = '{"id": 8,"command": "tx_history","start":' + start_idx + '}';
	webSocket.send(json);
}