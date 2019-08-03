/**
 * Methods for finding paths on in the ripple network
 */

/**
 * Find a path between specified accounts once. For repeated usage, call path_find instead.
 * @param src_account
 * @param src_currency
 * @param dest_account
 * @param dest_currency
 * @param dest_value
 * @returns
 * {
  "id": 1,
  "status": "success",
  "type": "response",
  "result": {
    "alternatives": [
      {
        "paths_canonical": [],
        "paths_computed": [
          [
            {
              "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              "type": 1,
              "type_hex": "0000000000000001"
            },
            {
              "currency": "XRP",
              "type": 16,
              "type_hex": "0000000000000010"
            },
            {
              "currency": "USD",
              "issuer": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
              "type": 48,
              "type_hex": "0000000000000030"
            },
            {
              "account": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
              "type": 1,
              "type_hex": "0000000000000001"
            },
            {
              "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "type": 1,
              "type_hex": "0000000000000001"
            }
          ],
          [
            {
              "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              "type": 1,
              "type_hex": "0000000000000001"
            },
            {
              "currency": "USD",
              "issuer": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
              "type": 48,
              "type_hex": "0000000000000030"
            },
            {
              "account": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
              "type": 1,
              "type_hex": "0000000000000001"
            },
            {
              "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "type": 1,
              "type_hex": "0000000000000001"
            }
          ],
          [
            {
              "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              "type": 1,
              "type_hex": "0000000000000001"
            }
          ],
          [
            {
              "account": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
              "type": 1,
              "type_hex": "0000000000000001"
            },
            {
              "account": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
              "type": 1,
              "type_hex": "0000000000000001"
            }
          ]
        ],
        "source_amount": {
          "currency": "USD",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "0.0040441464909846"
        }
      }
    ],
    "destination_account": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
    "destination_amount": {
      "currency": "USD",
      "issuer": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
      "value": "0.01"
    },
    "destination_currencies": [
      "USD",
      "XRP"
    ],
    "full_reply": true,
    "id": 1,
    "source_account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
    "status": "success"
  }
}
 */
function ripple_path_find(src_account, src_currency, dest_account, dest_currency, dest_value){
	let json = '{"id": 1,"command": "ripple_path_find","source_account": "' + src_account + '","source_currencies": [{"currency": "' + src_currency + '"}],"destination_account": "' + dest_account + '","destination_amount": {"currency": "' + dest_currency + '","value": "' + dest_value + '","issuer": "' + dest_account + '"}}';
	webSocket.send(json);
}

/**
 * Start or stop searching for payment paths between specified accounts. 
 * @param src_account
 * @param dest_account
 * @param dest_currency
 * @param dest_value
 * @returns 
 * {
  "id": 2,
  "status": "success",
  "type": "response",
  "result": {
    "alternatives": [
      {
        "paths_computed": [
          [
            {
              "currency": "USD",
              "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              "type": 48,
              "type_hex": "0000000000000030"
            },
            {
              "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              "type": 1,
              "type_hex": "0000000000000001"
            }
          ]
        ],
        "source_amount": "27429"
      },
      {
        "paths_computed": [
          [
            {
              "account": "razqQKzJRdB4UxFPWf5NEpEG3WMkmwgcXA",
              "type": 1,
              "type_hex": "0000000000000001"
            },
            {
              "currency": "USD",
              "issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              "type": 48,
              "type_hex": "0000000000000030"
            },
            {
              "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              "type": 1,
              "type_hex": "0000000000000001"
            }
          ]
        ],
        "source_amount": {
          "currency": "CNY",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "0.07011996"
        }
      },
      {
        "paths_computed": [
          [
            {
              "account": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B",
              "type": 1,
              "type_hex": "0000000000000001"
            }
          ]
        ],
        "source_amount": {
          "currency": "USD",
          "issuer": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
          "value": "0.01002"
        }
      }
    ],
    "destination_account": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
    "destination_amount": {
      "currency": "USD",
      "issuer": "ra5nK24KXen9AHvsdFTKHSANinZseWnPcX",
      "value": "0.01"
    },
    "full_reply": false,
    "id": 2,
    "source_account": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59"
  }
}
 */
function path_find(src_account, dest_account, dest_currency, dest_value){
	let json = '{"id": 3,"command": "path_find","subcommand": "create","source_account": "' + src_account + '","destination_account": "' + dest_account + '","destination_amount": {"currency": "' + dest_currency + '","value": "' + dest_value + '","issuer": "' + dest_account + '"}}';
	webSocket.send(json);
}

/**
 * I don't think this will be necessary
 * @returns
 */
function book_offers(){
	/*
	 * JSON should look like this to send
	 * {
  			"id": 3,
  			"command": "book_offers",
  			"taker": "r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59",
  			"taker_gets": {
    			"currency": "XRP"
  			},
  			"taker_pays": {
    		"currency": "USD",
    		"issuer": "rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B"
  		},
  		"limit": 10
	}
	 */
}