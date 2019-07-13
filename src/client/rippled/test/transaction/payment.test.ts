import { TransactionBuilder } from "../../model/transaction/TransactionBuilder";
import Source from "../../model/Source";
import Destination from "../../model/Destination";
import Amount from "../../model/Amount";
import Currency from "../../model/Currency";
import Payment from "../../model/transaction/Payment";

var assert = require('chai').assert

const basicPaymentTransaction = {
    "source": {
      "address": "source",
      "amount": {
        "value": "100",
        "currency": "XRP"
      }
    },
    "destination": {
      "address": "destination",
      "amount": {
        "value": "100",
        "currency": "XRP"
      }
    }
  }

describe('basic payment toJsonObject', function() {
    it('should return a valid JSON object', function() {
        const currency = new Currency("XRP", "$")
        const amount = new Amount(currency, "100")
        const source = new Source("source", amount)
        const destination = new Destination("destination", amount)
        const builder = new TransactionBuilder(source, destination)
        const payment = new Payment(builder)
        assert.deepEqual(payment.toJsonObject(), basicPaymentTransaction)
    });
});