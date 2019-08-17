import AccountCurrencies from '../../model/account/AccountCurrencies'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function getAccountCurrencies(account: string): Promise<AccountCurrencies> {
    return await api.connect().then(async() => {
        return await api.request('account_currencies', {account: account})
    })
}