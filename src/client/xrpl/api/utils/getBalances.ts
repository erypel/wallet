import { Balance } from '../model/Balance'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

interface Options {
    counterparty?: string
    currency?: string
    ledgerVersion?: string | number
    limit?: number
}

export default async function getBalances(address: string, options?: Options): Promise<Balance[]> {
    try {
        return await api.connect().then(async() => {
            return await api.getBalances(address, options)
        })
    } catch(error) {
        console.log(error)
        return []
    }
} 