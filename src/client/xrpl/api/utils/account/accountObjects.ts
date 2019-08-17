import AccountObjects from '../../model/account/AccountObjects'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function getAccountObjects(account: string): Promise<AccountObjects> {
    return await api.connect().then(async() => {
        return await api.request('account_objects', {account: account})
    })
}