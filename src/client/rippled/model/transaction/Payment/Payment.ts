import Transaction from '../Transaction'
import Instructions from '../../Instructions'
import { TransactionBuilder } from '../TransactionBuilder'
import PreparedTransaction from '../flow/PreparedTransaction'
import { PaymentBuilder } from './PaymentBuilder';
import Amount from '../../Amount';
import prepareTransaction from '../../../utils/flow/prepareTransacton';
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default class Payment extends Transaction {
  Amount: Amount | string
  Destination: string
  destinationTag?: number
  invoiceId?: string
  paths?: string
  sendMax?: Amount
  deliverMin?: Amount

  

  constructor(builder: TransactionBuilder, paymentBuilder: PaymentBuilder) {
    super(builder);
    this.Amount = paymentBuilder.amount
    this.Destination = paymentBuilder.destination
    this.destinationTag = paymentBuilder.destinationTag
    this.invoiceId = paymentBuilder.invoiceId
    this.paths = paymentBuilder.paths
    this.sendMax = paymentBuilder.sendMax
    this.deliverMin = paymentBuilder.deliverMin
  }

  preparePayment = async (): Promise<PreparedTransaction> => {
    return await this.callApiToPreparePayment(this.toJsonObject())
  }

  toJsonObject = () => {
    return JSON.parse(JSON.stringify(this, (_key, value) => {
      if (value !== null) return value
    }))
  }

  private callApiToPreparePayment = async(
    payment: object,
    instructions?: Instructions
  ): Promise<PreparedTransaction> => {
    try {
      return await api.connect().then(async () => {
        return await prepareTransaction(payment, instructions)
      })
    } finally {
      api.disconnect()
    }
  }
}
