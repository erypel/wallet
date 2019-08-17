import winston from "../../../../utils/logger"
import SubmittedTransaction from "../../model/transaction/flow/SubmittedTransaction";
const logger = winston(__filename)
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function submitTransaction(signedTransaction: string): Promise<SubmittedTransaction>{
	try {
		return await api.connect().then(async () => {
            return await api.submit(signedTransaction)
		}).catch((error: any) => {
			console.log(error)
			logger.error(error)
		}) //TODO could get fancy with error handling here in the future
	} finally {
		await api.disconnect()
	}
}