import Transaction from './Transaction'
import Source from '../Source'
import Destination from '../Destination'
import Instructions from '../Instructions'
import { TransactionBuilder } from './TransactionBuilder';
//const logger = require('../utils/logger')(__filename)
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

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

  toJsonObject = () => {
    return JSON.parse(JSON.stringify(this, (key, value) => {
      if (value !== null) return value
    }))
  }

  preparePayment = (address: string, instructions?: Instructions) => {
    return this.prepare(address, this.toJsonObject(), instructions)
  }

  // TODO should be private?
  prepare = async function(address: string, payment: string, instructions?: Instructions): Promise<object> {
    return api.preparePayment(address, payment).catch((error: any) => {
     // logger.error(error)    
    })
  }
}
