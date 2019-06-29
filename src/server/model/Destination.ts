import './Amount'

export default class Destination {
  address: string
  amount: Amount
  tag?: string
  minAmount: Amount

  constructor(address: string, amount: Amount, tag?: string, minAmount: Amount) {
    this.address = address
    this.amount = amount
    this.tag = tag
    this.minAmount = minAmount
  }
}
