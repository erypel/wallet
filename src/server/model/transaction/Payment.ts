import Transaction from './Transaction'
import Source from '../Source'
import Destination from '../Destination'
import Instructions from '../Instructions'

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

  prepare = function(address: string, payment: object, instructions?: Instructions): Promise<object> {
    return null //TODO
  }
}
