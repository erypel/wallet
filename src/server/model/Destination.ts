import Amount from './Amount'

export default class Destination {
  address: string
  amount: Amount
  tag?: string
  minAmount: Amount

  constructor(address: string, amount: Amount, minAmount: Amount, tag?: string) {
    this.address = address
    this.amount = amount
    this.tag = tag
    this.minAmount = minAmount
  }
}
