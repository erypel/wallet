import './Amount'

export default class Source {
  address: string
  amount: Amount
  tag?: string
  maxAmount: Amount

  constructor(address: string, amount: Amount, tag?: string, maxAmount: Amount) {
    this.address = address
    this.amount = amount
    this.tag = tag
    this.maxAmount = maxAmount
  }
}
