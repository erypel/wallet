const logger = require('../utils/logger')(__filename)
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

//TODO this could be the interface
//TODO these are nested calls and problems can occur if the api connection is severed too early. need to Un-nest

export default function signTransaction(txJSON: string, secret: string){
	api.connect().then(() => {
		logger.debug('signing transaction')
		return api.sign(txJSON, secret)
	}).then((signed: { signedTransaction: object; }) => {
		logger.debug(signed)
		logger.debug('signing done')
		submitTransaction(signed.signedTransaction)
	}).then(() => {
		return api.disconnect()
	}).then(() => {
		logger.debug('done and disconnected')
	}).catch((error: any) => {
		logger.error(error)
	})
}

function submitTransaction(signedTransaction: object){
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