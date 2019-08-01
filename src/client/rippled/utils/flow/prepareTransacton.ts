import Instructions from "../../model/Instructions";
import PreparedTransaction from "../../model/transaction/flow/PreparedTransaction";
import winston from '../../../utils/logger'

const logger = winston(__filename)
const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function prepareTransaction(
    transaction: object,
    _instructions?: Instructions
  ): Promise<PreparedTransaction> {
    return await api.prepareTransaction(transaction).then(
      (prepared: PreparedTransaction) => {
        return prepared  
      }
    ).catch((error: any) => {
      logger.error(error)    
    })
  }