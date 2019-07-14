import signTransaction from '../../model/transaction/flow'
var assert = require('chai').assert

const validTxJSON = '{"TransactionType":"Payment","Account":"rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS","Destination":"rwYQjHp9HZiKKpZB4i4fvc8eQvAtA7vdY6","Amount":"1000000","Flags":2147483648,"LastLedgerSequence":20987750,"Fee":"12","Sequence":1}'
const validSecret = 'snKixQChzs9KcBxxrYWpm97sxnA1e'
const invalidTxJSON = 'wrong'
const invalidSecret = 'nope'

describe('signTransaction', function() {
    it('should sign a valid transation', async function(done) {
      const signedTx = await signTransaction(validTxJSON, validSecret)
      assert.isString(signedTx.id)
      assert.isString(signedTx.signedTransaction)
      done()
    });

    it('should return undefined for invalid txJSON', async function(done) {
      const badTx = await signTransaction(invalidTxJSON, validSecret)
      assert.equal(badTx, undefined)
      done()
    });

    it('should return undefined for invalid secret', async function(done) {
      const badTx = await signTransaction(validTxJSON, invalidSecret)
      assert.equal(badTx, undefined)
      done()
    });
});

describe('submitTransaction', function() {
    it('should submit a valid transation', function() {
      //TODO
    });
    
    it('should throw error for invalid transation', function() {
        //TODO
    });
});

describe('verifyTransaction', function() {
    it('should verify a valid transation', function() {
      //TODO
    });
    
    it('should throw error for invalid transation', function() {
        //TODO
    });
});