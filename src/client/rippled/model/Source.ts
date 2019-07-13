import Amount from './Amount'

export default class Source {
  address: string
  amount?: Amount
  tag?: string
  maxAmount?: Amount

  constructor(address: string, amount?: Amount, maxAmount?: Amount, tag?: string) {
    if(amount === undefined && maxAmount === undefined) {
      throw Error("Need to define either amount or maxAmount")
    }

    if(amount && maxAmount) {
      this.maxAmount = maxAmount
    } else {
      this.amount = amount
      this.maxAmount = maxAmount
    }

    this.address = address
    this.tag = tag
  }
}
