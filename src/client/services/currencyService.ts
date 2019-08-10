import Amount, { IssuerAmount } from '../xrpl/api/model/Amount'
import dropsToXrp from '../xrpl/api/utils/dropsToXrp'

function createCurrencyString(amount: Amount | IssuerAmount | string) {
    if(typeof amount === 'string') {
        return `${dropsToXrp(amount)} XRP`
    } else {
        return `${amount.value} ${amount.currency}`
    }
}

export const currencyService = {
    createCurrencyString
}