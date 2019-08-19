import Transaction from '../xrpl/api/model/transaction/Transaction'
import PreparedTransaction from '../xrpl/api/model/transaction/flow/PreparedTransaction'
import toJsonObject from '../utils/toJsonObject'
import prepareTransaction from '../xrpl/api/utils/flow/prepareTransacton'
import SignedTransaction from '../xrpl/api/model/transaction/flow/SignedTransaction'
import signTransaction from '../xrpl/api/utils/flow/signTransaction'
import SubmittedTransaction from '../xrpl/api/model/transaction/flow/SubmittedTransaction'
import submitTransaction from '../xrpl/api/utils/flow/submitTransaction'
import processSubmittedTransaction from '../xrpl/api/model/transaction/results/processSubmittedTransaction'
import VerifiedTransaction from '../xrpl/api/model/transaction/flow/VerifiedTransaction'
import verifyTransaction from '../xrpl/api/utils/flow/verifyTransaction'

async function prepare(tx: Transaction): Promise<PreparedTransaction | null> {
    const txJson = toJsonObject(tx)
    return await prepareTransaction(txJson).then((preparedTx: PreparedTransaction) => {
        console.log(preparedTx)
        return preparedTx
    })
}

async function sign(preparedTx: PreparedTransaction, secret: string): Promise<SignedTransaction | null> {
    return await signTransaction(preparedTx.txJSON, secret).then((signedTx: SignedTransaction | null) => {
        console.log(signedTx)
        return signedTx
    })
}

async function submit(signedTx: SignedTransaction): Promise<SubmittedTransaction | null> {
    return await submitTransaction(signedTx.signedTransaction).then((submittedTx: SubmittedTransaction) => {
        console.log(submittedTx)
        processSubmittedTransaction(submittedTx)
        return submittedTx
    })
} 

async function verify(txId: string): Promise<VerifiedTransaction | null> {
    return await verifyTransaction(txId).then((verifiedTx: VerifiedTransaction) => {
        console.log(verifiedTx)
        return verifiedTx
    })
}

async function send(tx: Transaction, secret: string): Promise<string> {
    const prepped = await prepare(tx)
    if (prepped === null) {
        throw Error(`Error preparing transaction ${tx}`)
    }
    const signed = await sign(prepped, secret)
    if (signed === null) {
        throw Error(`Error signing prepared transaction ${prepped}`)
    }
    const submitted = await submit(signed)
    if (submitted === null) {
        throw Error(`Error submitting signed transaction ${signed}`)
    }
    return signed.id
}

export const transactionService = {
    prepare,
    sign,
    submit,
    verify,
    send
}