export default class Currency {
  code: string // a three character currency code
  country?: string // the name of the currency's country
  symbol: string // the currency symbol

  constructor(code: string, symbol: string, country?: string){
    this.code = code
    this.symbol = symbol
    this.country = country
  }
}
