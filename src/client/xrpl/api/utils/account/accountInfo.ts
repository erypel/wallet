import AccountInfo from '../../model/account/AccountInfo'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function getAccountInfo(account: string): Promise<AccountInfo> {
    return await api.connect().then(async() => {
        return await api.request('account_info', {account: account})
    })
}