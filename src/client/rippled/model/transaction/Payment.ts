import Transaction from './Transaction'
import Source from '../Source'
import Destination from '../Destination'
import Instructions from '../Instructions'
import { TransactionBuilder } from './TransactionBuilder';
import winston from '../../../utils/logger';
import PreparedTransaction from './flow/PreparedTransaction';
import { PaymentBuilder } from './PaymentBuilder';
import Amount from '../Amount';
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

const logger = winston(__filename)

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
    return await this.callApiToPreparePayment(this.Account, this.toJsonObject())
  }

  toJsonObject = () => {
    return JSON.parse(JSON.stringify(this, (_key, value) => {
      if (value !== null) return value
    }))
  }

  private callApiToPreparePayment = async(
    address: string,
    payment: object,
    instructions?: Instructions
  ): Promise<PreparedTransaction> => {
    try {
      return await api.connect().then(async () => {
        return await this.prepare(address, payment, instructions)
      })
    } finally {
      api.disconnect()
    }
  }

  private prepare = async(
    address: string,
    payment: object,
    _instructions?: Instructions
  ): Promise<PreparedTransaction> => {
    return await api.prepareTransaction(payment).then(
      (prepared: PreparedTransaction) => {
        return prepared  
      }
    ).catch((error: any) => {
      logger.error(error)    
    })
  }
}
