import Transaction from './Transaction'
import Source from '../Source'
import Destination from '../Destination'
import Instructions from '../Instructions'
import { TransactionBuilder } from './TransactionBuilder';
import winston from '../../../utils/logger';
import PreparedTransaction from './PreparedTransaction';
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

const logger = winston(__filename)

export default class Payment extends Transaction {
  source: Source
  destination: Destination
  allowPartialPayment?: boolean
  invoiceId?: string
  limitQuality?: boolean
  //memos?: Memos[]
  noDirectRipple?: boolean
  paths?: string

  

  constructor(builder: TransactionBuilder) {
    super(builder);
    this.source = builder.source
    this.destination = builder.destination
    this.allowPartialPayment = builder.allowPartialPayment
    this.invoiceId = builder.invoiceId
    this.limitQuality = builder.limitQuality
    // this.memos = builder.memos
    this.noDirectRipple = builder.noDirectRipple
    this.paths = builder.paths
  }

  send = async (): Promise<PreparedTransaction> => {
    return await this.preparePayment(this.source.address, this.toJsonObject())
  }

  toJsonObject = () => {
    return JSON.parse(JSON.stringify(this, (_key, value) => {
      if (value !== null) return value
    }))
  }

  private preparePayment = async(
    address: string,
    payment: object,
    instructions?: Instructions
  ): Promise<PreparedTransaction> => {
    return await api.connect().then(async () => {
      return this.prepare(address, payment, instructions)
    })
  }

  private prepare = async(
    address: string,
    payment: object,
    _instructions?: Instructions
  ): Promise<PreparedTransaction> => {
    return await api.preparePayment(address, payment).then(
      (prepared: PreparedTransaction) => {
        return prepared  
      }
    ).catch((error: any) => {
      logger.error(error)    
    })
  }
}
