const RippleAPI = require('ripple-lib').RippleAPI
const rippleApi = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

const api = rippleApi.connect().then(() => {return api})

export default api