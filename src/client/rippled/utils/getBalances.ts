import Balance from '../model/Balance'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function getBalances(address: string, options = '{"currency": "XRP"}'): Promise<Balance[]> {
    try {
        return await api.connect().then(async() => {
            return await api.getBalances(address)
        })
    } catch(error) {
        console.log(error)
        return []
    }
} 