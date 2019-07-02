import Transaction from './Transaction'
import Source from '../Source'
import Destination from '../Destination'
import Instructions from '../Instructions'
const logger = require('../utils/logger')(__filename)
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default class Payment implements Transaction {
  source: Source
  destination: Destination
  allowPartialPayment?: boolean
  invoiceID?: string
  limitQuality?: boolean
  //memos?: Memos[]
  noDirectRipple?: boolean
  paths?: string

  constructor(
    source: Source,
    destination: Destination,
    allowPartialPayment?: boolean,
    invoiceID?: string,
    limitQuality?: boolean,
    //memos?: Memos[],
    noDirectRipple?: boolean,
    paths?: string
  ) {
    this.source = source
    this.destination = destination
    this.allowPartialPayment = allowPartialPayment
    this.invoiceID = invoiceID
    this.limitQuality = limitQuality
    // this.memos = memos
    this.noDirectRipple = noDirectRipple
    this.paths = paths
  }

  toJsonObject = () => {
    return JSON.stringify(this, (key, value) => {
      if (value !== null) return value
    })
  }

  preparePayment = (address: string, instructions?: Instructions) => {
    return this.prepare(address, this.toJsonObject(), instructions)
  }

  // TODO should be private?
  prepare = async function(address: string, payment: string, instructions?: Instructions): Promise<object> {
    return api.preparePayment(address, payment).catch((error: any) => {
      logger.error(error)    
    })
  }
}
