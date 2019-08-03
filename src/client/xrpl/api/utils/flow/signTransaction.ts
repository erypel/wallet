import SignedTransaction from "../../model/transaction/flow/SignedTransaction";
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function signTransaction(
	txJSON: string, secret: string
): Promise<SignedTransaction | null>{
	try {
		return await api.sign(txJSON, secret)
	} catch(error) {
		console.log(error)
		return null
	}
}