const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function getAccountCurrencies(account: string): Promise<any> {
    return await api.request('account_currencies', {account: account})
}