const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export async function isValidSecret(address: string) {
        return await api.connect().then(async() => {
            return await api.isValidSecret(address)
        })
}