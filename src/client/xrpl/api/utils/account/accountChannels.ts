import AccountChannels from '../../model/account/AccountChannels'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function getAccountChannels(account: string): Promise<AccountChannels> {
    return await api.connect().then(async() => {
        return await api.request('account_channels', {account: account})
    })
}