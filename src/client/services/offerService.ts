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
import Amount from '../xrpl/api/model/Amount'
import xrpToDrops from '../xrpl/api/utils/xrpToDrops'
import iso8601ToRippleTime from '../xrpl/api/utils/iso8601ToRippleTime'

function buildMarketOrder(account: string, isSell: boolean, amount: Amount) {
    //TODO will also want a parameter for what is being bought/sold
}

function buildLimitOrder(
    account: string, 
    isSell: boolean, 
    amount: Amount, 
    limitPrice: Amount, 
    showAdvanced: boolean, 
    timeInForce: string, 
    isPostOnly: boolean
) {
    const takerGets = createTakerGets(isSell, amount, limitPrice)
    const takerPays = createTakerPays(isSell, amount, limitPrice)

    const transactionBuilder = new TransactionBuilder(account, 'OfferCreate')
    const offerBuilder = new OfferCreateBuilder(takerGets, takerPays)
    
    if (isSell) {
        transactionBuilder.addFlag(OfferCreateFlags.tf_SELL)
    }

    if (showAdvanced) {
        switch(timeInForce) {
            case 'Good Til Cancelled':
                // Nothing needs to be done
                break
            case 'Good Til Time':
                const today = new Date()
                const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))
                const iso = tomorrow.toISOString()
                const rippleTime = iso8601ToRippleTime(iso)
                offerBuilder.setExpiration(rippleTime) //TODO add other expiration times
                break 
            case 'Immediate or Cancel':
                transactionBuilder.addFlag(OfferCreateFlags.tf_IMMEDIATE_OR_CANCEL)
                break
            case 'Fill or Kill':
                transactionBuilder.addFlag(OfferCreateFlags.tf_FILL_OR_KILL)
                break
            default:
                break
        }

        //TODO isPostOnly fields (if isPostOnly, reject offer if any part of it would be filled immediately)
    }
    const offer = new OfferCreate(transactionBuilder, offerBuilder)
    return offer
}

function formatCurrency(amount: Amount): Amount | string {
    const { currency } = amount
    if (currency === 'drops') {
        return amount.value
    } else if (currency === 'XRP') {
        return xrpToDrops(amount.value)
    } else {
        return amount
    }
}

function createTakerGets(isSell: boolean, amount: Amount, limit: Amount): Amount | string {
    if (isSell) {
        return formatCurrency(amount)
    } else { //isBuy
        return formatCurrency(limit)
    }
}

function createTakerPays(isSell: boolean, amount: Amount, limit: Amount): Amount | string {
    if (isSell) {
        return formatCurrency(limit)
    } else {
        return formatCurrency(amount)
    }
}

function buildCreateOffer(
    account: string,
    isSell: boolean, 
    amount: Amount, 
    limitPrice: Amount, 
    stopPrice: number, //need to think about this one... may need to build serverside
    showAdvanced: boolean, 
    timeInForce: string, 
    isPostOnly: boolean
) {
    if(limitPrice.value !== '0') { //TODO pass in order type and use that
        return buildLimitOrder(
            account, isSell, amount, limitPrice, showAdvanced, timeInForce, isPostOnly
        )
    } else {
        return buildMarketOrder(account, isSell, amount)
    }
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
    const test = '{"Flags":2147483648,"TransactionType":"OfferCreate","Account":"rNsjHCBJWAa8JWTTCA2EEd5uREDTeyZiDM","TakerGets":"2000000","TakerPays":{"currency":"USD","issuer":"rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq"},"LastLedgerSequence":21611142,"Fee":"12","Sequence":4}'

    return await signTransaction(test, secret)
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
