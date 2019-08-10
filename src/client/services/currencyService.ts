import Amount, { IssuerAmount } from '../xrpl/api/model/Amount'

function createCurrencyString(amount: Amount | IssuerAmount | string) {
    if(typeof amount === 'string') {
        return `${amount} XRP`
    } else {
        return `${amount.value} ${amount.currency}`
    }
}

export const currencyService = {
    createCurrencyString
}