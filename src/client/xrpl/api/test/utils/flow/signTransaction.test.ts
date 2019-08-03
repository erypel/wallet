import signTransaction from "../../../utils/flow/signTransaction";
import { fail } from "assert";

var assert = require('chai').assert

const validTxJSON = '{"TransactionType":"Payment","Account":"rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS","Destination":"rwYQjHp9HZiKKpZB4i4fvc8eQvAtA7vdY6","Amount":"1000000","Flags":2147483648,"LastLedgerSequence":20987750,"Fee":"12","Sequence":1}'
const validSecret = 'snKixQChzs9KcBxxrYWpm97sxnA1e'
const invalidTxJSON = 'wrong'
const invalidSecret = 'nope'

describe('signTransaction', function() {
    it('should sign a valid transation', async function(done) {
      const signedTx = await signTransaction(validTxJSON, validSecret)
      if(signedTx === null) {
        fail()
      } else {
      assert.isString(signedTx.id)
      assert.isString(signedTx.signedTransaction)
      done()
      }
    });

    it.only('should return null for invalid txJSON', async function(done) {
      const tx = await signTransaction(invalidTxJSON, validSecret)
      assert.isNull(tx)
      done()
    });

    it('should return null for invalid secret', async function(done) {
      const badTx = await signTransaction(validTxJSON, invalidSecret)
      assert.isNull(badTx)
      done()
    });
});
