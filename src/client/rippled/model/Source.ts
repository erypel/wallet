import Amount from './Amount'

export default class Source {
  address: string
  amount: Amount
  tag?: string
  maxAmount: Amount

  constructor(address: string, amount: Amount, maxAmount: Amount, tag?: string) {
    this.address = address
    this.amount = amount
    this.tag = tag
    this.maxAmount = maxAmount
  }
}
