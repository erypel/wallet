import { TransactionBuilder } from '../../model/transaction/TransactionBuilder'
import Source from '../../model/Source'
import Destination from '../../model/Destination'
import Amount from '../../model/Amount'
import Currency from '../../model/Currency'
import Payment from '../../model/transaction/Payment'

var assert = require('chai').assert

const basicPaymentTransaction = {
    "source": {
      "address": "rwYQjHp9HZiKKpZB4i4fvc8eQvAtA7vdY6",
      "maxAmount": {
        "value": "100",
        "currency": "XRP"
      }
    },
    "destination": {
      "address": "rpZc4mVfWUif9CRoHRKKcmhu1nx2xktxBo",
      "amount": {
        "value": "100",
        "currency": "XRP"
      }
    }
  }

const expectedTxJSONRegex = /{"TransactionType":"Payment","Account":"rwYQjHp9HZiKKpZB4i4fvc8eQvAtA7vdY6","Destination":"rpZc4mVfWUif9CRoHRKKcmhu1nx2xktxBo","Amount":"100000000","Flags":2147483648,"LastLedgerSequence":[0-9]*,"Fee":"[0-9]*","Sequence":1}/

export function buildTestPaymentObject(): Payment {
  const currency = new Currency("XRP", "$")
  const amount = new Amount(currency, "100")
  const source = new Source("rwYQjHp9HZiKKpZB4i4fvc8eQvAtA7vdY6", undefined, amount)
  const destination = new Destination("rpZc4mVfWUif9CRoHRKKcmhu1nx2xktxBo", amount)
  const builder = new TransactionBuilder(source, destination)
  return new Payment(builder)
}

describe('basic payment toJsonObject', function() {
    it('should return a valid JSON object', function() {
        const payment = buildTestPaymentObject()
        assert.deepEqual(payment.toJsonObject(), basicPaymentTransaction)
    });
});

describe('prepare payment', function() {
  it('should return a prepared payment with txJSON and instructions', async function(done) {
    const payment = buildTestPaymentObject()
    const preparedPayment = await payment.preparePayment()
    assert.isTrue(expectedTxJSONRegex.test(preparedPayment.txJSON))
    assert.isObject(preparedPayment.instructions)
    done()
  })
})