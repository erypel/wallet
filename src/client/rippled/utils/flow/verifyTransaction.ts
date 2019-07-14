import winston from '../../../utils/logger'
const logger = winston(__filename)
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default function verifyTransaction(transactionID: string){
	api.connect().then(() => {
		logger.debug('verifying transaction')
		return api.getTransaction(transactionID)
	}).then((result: any) => {
		logger.debug(result)
		logger.debug('verified')
	}).then(() => {
		return api.disconnect()
	}).then(() => {
		logger.debug('done and disconnected')
	}).catch((error: any) => {
		logger.error(error)
	})
}