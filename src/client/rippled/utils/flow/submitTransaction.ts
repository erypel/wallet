import winston from "../../../utils/logger";
import SubmittedTransaction from "../../model/transaction/SubmittedTransaction";
const logger = winston(__filename)
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function submitTransaction(signedTransaction: string): Promise<SubmittedTransaction>{
	try {
		return await api.connect().then(async () => {
            const test = await api.submit(signedTransaction)
			return test
		}).catch((error: any) => {logger.error(error)}) //TODO could get fancy with error handling here in the future
	} finally {
		await api.disconnect()
	}
}