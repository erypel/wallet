import Amount, { IssuerAmount } from '../xrpl/api/model/Amount'
import dropsToXrp from '../xrpl/api/utils/dropsToXrp'
import xrpToDrops from '../xrpl/api/utils/xrpToDrops'

function createCurrencyString(amount: Amount | IssuerAmount | string) {
    if(typeof amount === 'string') {
        return `${dropsToXrp(amount)} XRP`
    } else {
        return `${amount.value} ${amount.currency}`
    }
}

function createAmount(amount: Amount | IssuerAmount | string) {
    if(typeof amount === 'string') {
        return new Amount('XRP', dropsToXrp(amount))
    } else {
        return new Amount(amount.currency, amount.value)
    }
}

function formatCurrency(amount: Amount): Amount | string {
    const { currency } = amount
    if (currency === 'drops') {
        return amount.value
    } else if (currency === 'XRP') {
        return xrpToDrops(amount.value)
    } else {
        return amount
    }
}

export const currencyService = {
    createCurrencyString,
    createAmount,
    formatCurrency
}