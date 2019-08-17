import signTransaction from "../../../utils/flow/signTransaction"
import { buildTestPaymentObject } from "../../transaction/payment.test"
import submitTransaction from "../../../utils/flow/submitTransaction"
import toJsonObject from '../../../../../utils/toJsonObject'
import prepareTransaction from '../../../utils/flow/prepareTransacton'

var assert = require('chai').assert

describe('submitTransaction', function() {
    it('should submit a valid transation', async function(done) {
      const payment = buildTestPaymentObject()
      const preparedPayment = await prepareTransaction(toJsonObject(payment))
      const signedTx = await signTransaction(preparedPayment.txJSON, 'snKixQChzs9KcBxxrYWpm97sxnA1e')
      const submittedTx = await submitTransaction(signedTx!!.signedTransaction)
      assert.equal(submittedTx.engine_result, 'tesSUCCESS')
      done()
    });
});