import Currency from "./Currency";

export default class Amount {
  currency: string
  value: string
  counterparty?: string
  
  constructor(currency: Currency, value: string, counterparty?: string){
    this.currency = currency.code
    this.value = value
    this.counterparty = counterparty
  }
}
