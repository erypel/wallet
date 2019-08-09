import Currency from './Currency'

export default class Amount {
  currency: string
  value: string
  counterparty?: string
  
  constructor(currency: Currency | string, value: string, counterparty?: string) {
    this.currency = (typeof currency === 'string') ? currency : currency.code
    this.value = value
    this.counterparty = counterparty
  }

  toIssuerAmount() {
    return new IssuerAmount(this.currency, this.value, this.counterparty)
  }
}

export function amountToIssuerAmount(amount: Amount) {
  return new IssuerAmount(amount.currency, amount.value, amount.counterparty) 
}

export class IssuerAmount {
  currency: string
  value: string
  issuer?: string
  
  constructor(currency: string, value: string, issuer?: string){
    this.currency = currency
    this.value = value
    this.issuer = issuer
  }
}