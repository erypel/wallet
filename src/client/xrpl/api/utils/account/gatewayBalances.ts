import GatewayBalances from '../../model/account/GatewayBalances'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function getGatewayBalances(account: string): Promise<GatewayBalances> {
    return await api.connect().then(async() => {
        return await api.request('gateway_balances', {account: account})
    })
}