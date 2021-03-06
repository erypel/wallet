import Currency from './Currency'
import dropsToXrp from '../utils/dropsToXrp'

export default class Amount {
  currency: string
  value: string
  counterparty?: string
  
  constructor(currency: Currency | string, value: string, counterparty?: string) {
    this.currency = (typeof currency === 'string') ? currency : currency.code
    this.value = value
    this.counterparty = counterparty
  }
}

export function amountToIssuerAmount(amount: Amount) {
  return new IssuerAmount(amount.currency, amount.value, amount.counterparty) 
}

export function issuerAmountToAmount(amount: string | IssuerAmount) {
  if (typeof amount === 'string') {
    return new Amount('XRP', dropsToXrp(amount))
  } else {
    return new Amount(amount.currency, amount.value, amount.issuer)
  }
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