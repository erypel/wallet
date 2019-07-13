import Transaction from './Transaction'
import Source from '../Source'
import Destination from '../Destination'
import Instructions from '../Instructions'
import { TransactionBuilder } from './TransactionBuilder';
import winston from '../../../utils/logger';
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

  send = () => {
    this.prepare(this.source.address, this.toJsonObject())
  }

  toJsonObject = () => {
    return JSON.parse(JSON.stringify(this, (key, value) => {
      if (value !== null) return value
    }))
  }

  preparePayment = (address: string, instructions?: Instructions) => {
    return this.prepare(address, this.toJsonObject(), instructions)
  }

  // TODO should be private?
  prepare = async(address: string, payment: object, instructions?: Instructions): Promise<object> => {
    console.log("payment", payment)
    return api.connect().then(() => {
      api.preparePayment(address, payment).then((prepared: object) => {
        console.log(prepared)
      }).catch((error: any) => {
        console.log(error)
        logger.error(error)    
      })
    })
  }
}
