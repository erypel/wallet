import winston from '../../../utils/logger'
import SignedTransaction from './SignedTransaction';
const logger = winston(__filename)
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

//TODO this could be the interface
//TODO these are nested calls and problems can occur if the api connection is severed too early. need to Un-nest

export default async function signTransaction(
	txJSON: string, secret: string
): Promise<SignedTransaction>{
	try {
		return await connect().then(async () => {
			return await api.sign(txJSON, secret)
		}).catch((error: any) => {logger.error(error)}) //TODO could get fancy with error handling here in the future
	} finally {
		disconnect()
	}
}

async function connect() {
	api.connect()
}

function disconnect() {
	api.disconnect()
}

function submitTransaction(signedTransaction: string){
	api.connect().then(() => {
		logger.debug('submitting transaction')
		return api.submit(signedTransaction)
	}).then((result: { id: string; }) => {
		logger.debug(result)
		logger.debug('submitted')
		verifyTransaction(result.id)
	}).then(() => {
		return api.disconnect()
	}).then(() => {
		logger.debug('done and disconnected')
	}).catch((error: any) => {
		logger.error(error)
	})
}

function verifyTransaction(transactionID: string){
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