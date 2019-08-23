import { TransactionTypes } from '../Transaction'
import TransactionMetadata from '../TransactionMetadata'

export default interface TransactionStreamMessage {
    type: string
    engine_result: string
    engine_result_code: number
    engine_result_message: string
    ledger_current_index?: number
    ledger_hash?: string
    ledger_index?: number
    meta?: TransactionMetadata
    transaction: TransactionTypes
    validated: boolean
}