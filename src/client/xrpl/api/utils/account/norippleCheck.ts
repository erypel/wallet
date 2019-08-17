const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function norippleCheck(account: string, role: 'gateway' | 'user'): Promise<any> {
    return await api.connect().then(async() => {
        return await api.request('noripple_check', {account: account, role: role})
    })
}