import winston from '../../../utils/logger'
import VerifiedTransaction from '../../model/transaction/flow/VerifiedTransaction';
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function verifyTransaction(transactionID: string): Promise<VerifiedTransaction>{
	try {
		return await api.connect().then(async () => {
			return await api.getTransaction(transactionID)
		})
	} finally {
		api.disconnect()
	}
}