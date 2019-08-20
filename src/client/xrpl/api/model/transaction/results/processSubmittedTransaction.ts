import SubmittedTransaction from '../flow/SubmittedTransaction'
import { tesSuccess } from './tesSuccess'
import { tecCodes } from './tecCodes'
import { tefCodes } from './tefCodes'
import { telCodes } from './telCodes'
import { temCodes } from './temCodes'
import { terCodes } from './terCodes'

export default function processSubmittedTransaction(submittedTx: SubmittedTransaction) {
    const { engine_result: result } = submittedTx
    if (result === tesSuccess.code) {
        // transaction succeeded
        return
    } else if (tecCodes[result]) {
        // claimed cost only
    } else if (tefCodes[result]) {
        // failure
    } else if (telCodes[result]) {
        // local error
    } else if (temCodes[result]) {
        // malformed transaction
    } else if (terCodes[result]) {
        // retry
    } else {
        console.log('unrecognized result: ', result)
    }
}