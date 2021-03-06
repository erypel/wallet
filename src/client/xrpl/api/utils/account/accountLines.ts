import AccountLines from '../../model/account/AccountLines'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function getAccountLines(account: string): Promise<AccountLines> {
    return await api.connect().then(async() => {
        return await api.request('account_lines', {account: account})
    })
}