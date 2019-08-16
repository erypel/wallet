const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function getAccountOffers(account: string): Promise<any> {
    return await api.request('account_offers', {account: account})
}