import Amount from './Amount'

export default class Destination {
  address: string
  amount?: Amount
  tag?: string
  minAmount?: Amount

  constructor(address: string, amount?: Amount, minAmount?: Amount, tag?: string) {
    if(amount === undefined && minAmount === undefined) {
      throw Error("Need to define either amount or minAmount")
    }

    if(amount && minAmount) {
      this.minAmount = minAmount
    } else {
      this.amount = amount
      this.minAmount = minAmount
    }

    this.address = address
    this.tag = tag
  }
}
