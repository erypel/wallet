import OfferCreate, { OfferCreateFlags } from '../xrpl/api/model/transaction/OfferCreate/OfferCreate'
import { OfferCreateBuilder } from '../xrpl/api/model/transaction/OfferCreate/OfferCreateBuilder'
import { TransactionBuilder } from '../xrpl/api/model/transaction/TransactionBuilder'
import prepareTransaction from '../xrpl/api/utils/flow/prepareTransacton'
import PreparedTransaction from '../xrpl/api/model/transaction/flow/PreparedTransaction'
import toJsonObject from '../utils/toJsonObject'
import signTransaction from '../xrpl/api/utils/flow/signTransaction'
import submitTransaction from '../xrpl/api/utils/flow/submitTransaction'
import SignedTransaction from '../xrpl/api/model/transaction/flow/SignedTransaction'
import verifyTransaction from '../xrpl/api/utils/flow/verifyTransaction'
import SubmittedTransaction from '../xrpl/api/model/transaction/flow/SubmittedTransaction'
import VerifiedTransaction from '../xrpl/api/model/transaction/flow/VerifiedTransaction'
import Amount from '../xrpl/api/model/Amount';
import Currency from '../xrpl/api/model/Currency';

function buildCreateOffer(
    account: string,
    isSell: boolean, 
    amount: number, 
    limitPrice: number, 
    stopPrice: number, 
    showAdvanced: boolean, 
    timeInForce: string, 
    isPostOnly: boolean
) {
    const transactionBuilder = new TransactionBuilder(account, 'OfferCreate')
    const currency = new Currency('USD', '$')
    const takerPays = new Amount(currency, '10', 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq')
        
    const takerGets = '100000000'
    const offerBuilder = new OfferCreateBuilder(takerGets, takerPays)

    if (showAdvanced) {
        switch(timeInForce) {
            case 'Good Til Cancelled':
                //TODO
                break
            case 'Good Til Time':
                offerBuilder.setExpiration(1) //TODO
                break 
            case 'Immediate or Cancel':
                transactionBuilder.setFlags(OfferCreateFlags.tf_IMMEDIATE_OR_CANCEL)
                break
            case 'Fill or Kill':
                transactionBuilder.setFlags(OfferCreateFlags.tf_FILL_OR_KILL)
                break
            default:
                break
        }

        //TODO isPostOnly fields
    }
    
    const offer = new OfferCreate(transactionBuilder, offerBuilder)
    return offer
}

function validateCreateOffer(offer: OfferCreate) {
    flagCheck(offer)
}

function flagCheck(offer: OfferCreate) {
    const flags = offer.flags
    const { tf_IMMEDIATE_OR_CANCEL, tf_FILL_OR_KILL } = OfferCreateFlags
    if (flags && flags.has(tf_IMMEDIATE_OR_CANCEL) && flags.has(tf_FILL_OR_KILL)) {
        throw Error( 'Invalid flags ')
    }
}

async function sendOffer(offer: OfferCreate, secret: string) {
    prepareOffer(offer).then((preppedTx: PreparedTransaction | null) => {
        if(preppedTx === null) {
            throw Error('Error prepping tx')
        }
        console.log('prepped offer', preppedTx)
        signOffer(preppedTx, secret).then((signedTx: SignedTransaction | null) =>{
            if(signedTx === null) {
                throw Error('Error signing tx')
            }
            console.log('signed', signedTx)
            submitOffer(signedTx).then((submittedTx: SubmittedTransaction | null) => {
                console.log('submitted', submittedTx)
            })
        })
    })
}

async function prepareOffer(offer: OfferCreate): Promise<PreparedTransaction | null> {
    const offerJson = toJsonObject(offer)
    return await prepareTransaction(offerJson).then((preparedTx: PreparedTransaction) => {
        console.log(preparedTx)
        return preparedTx
    })
}

async function signOffer(preparedTx: PreparedTransaction, secret: string): Promise<SignedTransaction | null> {
    //const test = '{"Flags":2147483648,"TransactionType":"OfferCreate","Account":"rNsjHCBJWAa8JWTTCA2EEd5uREDTeyZiDM","TakerGets":"2000000","TakerPays":{"value":"10.1","currency":"USD","issuer":"rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq"},"LastLedgerSequence":21611142,"Fee":"12","Sequence":4}'

    return await signTransaction(preparedTx.txJSON, secret)
}

async function submitOffer(signedTx: SignedTransaction): Promise<SubmittedTransaction | null> {
    return await submitTransaction(signedTx.signedTransaction)
}

async function verifyOffer(txId: string): Promise<VerifiedTransaction | null> {
    return await verifyTransaction(txId)
}

export const offerService = {
    buildCreateOffer,
    validateCreateOffer,
    sendOffer
}
