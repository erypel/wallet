import AccountTransactions from '../../model/account/AccountTransactions'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function getAccountTx(account: string): Promise<AccountTransactions> {
    return await api.connect().then(async() => {
        return await api.request('account_tx', {account: account})
    })
}