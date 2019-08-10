import OrderCreate, { OrderCreateFlags } from '../xrpl/api/model/transaction/OrderCreate/OrderCreate'
import { OrderCreateBuilder } from '../xrpl/api/model/transaction/OrderCreate/OrderCreateBuilder'
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
import { orderbookService } from './orderbookService'
import { rippledStream } from '../xrpl/rippled/methods/stream'
import Ask from '../xrpl/api/model/transaction/Orderbook/Ask'
import Bid from '../xrpl/api/model/transaction/Orderbook/Bid'
import OrderCancellation from '../xrpl/api/model/transaction/OrderCancellation/OrderCancellation'
import { OrderCancellationBuilder } from '../xrpl/api/model/transaction/OrderCancellation/OrderCancellationBuilder'
import Transaction from '../xrpl/api/model/transaction/Transaction'

function findBidLimitPrice(offers: Bid[] | Ask[], value: number): Amount {
    if (offers.length === 0) {
        throw Error('Not enough order book depth for order. Try placing a limit order.')
    }
    var remainingValue = value
    for(let i = 0; i < offers.length; i++) {
        const offer = offers[i]
        //TODO will eventually want to deal with the state of the offer and whether it's been partially filled
        const { totalPrice, quantity } = offer.specification
        const bidCost = totalPrice.value
        remainingValue -= Number(bidCost)
        if(remainingValue <= 0) {
            return quantity
        }
    }

    throw Error('Not enough order book depth for order. Try placing a limit order.')
}



async function buildMarketOrderLimitPrice(address: string, isSell: boolean, amount: Amount, baseCurrency: string, quoteCurrency: string): Promise<Amount> {
    //TODOThis is not the right way to do it, but it will work for now before the DEX refactor
    const book = await rippledStream.subscribeToBook(baseCurrency, quoteCurrency).then((result: {asks: Ask[], bids: Bid[]}) => {
        return result
    })
    const bids = book.bids
    const asks = book.asks
    
    const formattedAmount = formatCurrency(amount)
    const value = typeof formattedAmount === 'string' ? formattedAmount : formattedAmount.value

    if (isSell) {
        //get bids
        return findBidLimitPrice(bids, Number(value)) //TODO probably unsafe
        //This is the right way to do things
        //orderbookService.getBids(adress, amount.currency, ...)
    } else { //isBuy
        //get asks
        return findBidLimitPrice(asks, Number(amount.value)) //TODO probably unsafe
    }
}

async function buildMarketOrder(account: string, isSell: boolean, amount: Amount, baseCurrency: string, quoteCurrency: string): Promise<OrderCreate> {
    //TODO will also want a parameter for what is being bought/sold
    const limitPrice = await buildMarketOrderLimitPrice('', isSell, amount, baseCurrency, quoteCurrency)

    // THIS IS WRONG. RECIEVING 2 USD AMOUNTS
    const takerGets = createTakerGets(isSell, amount, limitPrice)
    const takerPays = createTakerPays(isSell, amount, limitPrice)

    if(typeof takerPays !== 'string' && takerPays.counterparty === undefined) {
        takerPays.counterparty = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'
    }

    const transactionBuilder = new TransactionBuilder(account, 'OfferCreate')
    const offerBuilder = new OrderCreateBuilder(takerGets, takerPays)

    if (isSell) {
        transactionBuilder.addFlag(OrderCreateFlags.tf_SELL)
    }

    transactionBuilder.addFlag(OrderCreateFlags.tf_FILL_OR_KILL)

    const offer = new OrderCreate(transactionBuilder, offerBuilder)
    return offer
}

function buildLimitOrder(
    account: string, 
    isSell: boolean, 
    amount: Amount, 
    limitPrice: Amount, 
    showAdvanced: boolean, 
    timeInForce: string, 
    isPostOnly: boolean
): OrderCreate {
    const takerGets = createTakerGets(isSell, amount, limitPrice)
    const takerPays = createTakerPays(isSell, amount, limitPrice)

    const transactionBuilder = new TransactionBuilder(account, 'OfferCreate')
    const offerBuilder = new OrderCreateBuilder(takerGets, takerPays)
    
    if (isSell) {
        transactionBuilder.addFlag(OrderCreateFlags.tf_SELL)
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
                transactionBuilder.addFlag(OrderCreateFlags.tf_IMMEDIATE_OR_CANCEL)
                break
            case 'Fill or Kill':
                transactionBuilder.addFlag(OrderCreateFlags.tf_FILL_OR_KILL)
                break
            default:
                break
        }

        //TODO isPostOnly fields (if isPostOnly, reject offer if any part of it would be filled immediately)
    }
    const offer = offerBuilder.build(transactionBuilder)
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

function cancelOffer(account: string, secret: string, orderSequence: number) {
    const orderCancellation = buildOrderCancellation(account, orderSequence)
    sendOffer(orderCancellation, secret)
}

function buildOrderCancellation(account: string, orderSequence: number): OrderCancellation {
    const transactionBuilder = new TransactionBuilder(account, 'OfferCancel')
    const orderCancellationBuilder = new OrderCancellationBuilder(orderSequence)
    return orderCancellationBuilder.build(transactionBuilder)
}

async function buildCreateOffer(
    account: string,
    isSell: boolean, 
    amount: Amount, 
    limitPrice: Amount, 
    stopPrice: number, //need to think about this one... may need to build serverside listener
    showAdvanced: boolean, 
    timeInForce: string, 
    isPostOnly: boolean,
    baseCurrency: string,
    quoteCurrency: string
): Promise<OrderCreate> {
    if(limitPrice.value !== '0') { //TODO pass in order type and use that
        return buildLimitOrder(
            account, isSell, amount, limitPrice, showAdvanced, timeInForce, isPostOnly
        )
    } else {
        return await buildMarketOrder(account, isSell, amount, baseCurrency, quoteCurrency)
    }
}

function validateCreateOffer(offer: OrderCreate) {
    flagCheck(offer)
}

function flagCheck(offer: OrderCreate) {
    const flags = offer.flags
    const { tf_IMMEDIATE_OR_CANCEL, tf_FILL_OR_KILL } = OrderCreateFlags
    if (flags && flags.has(tf_IMMEDIATE_OR_CANCEL) && flags.has(tf_FILL_OR_KILL)) {
        throw Error( 'Invalid flags ')
    }
}

async function sendOffer(offer: Transaction, secret: string) {
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

async function prepareOffer(offer: Transaction): Promise<PreparedTransaction | null> {
    const offerJson = toJsonObject(offer)
    return await prepareTransaction(offerJson).then((preparedTx: PreparedTransaction) => {
        console.log(preparedTx)
        return preparedTx
    })
}

async function signOffer(preparedTx: PreparedTransaction, secret: string): Promise<SignedTransaction | null> {
    //const test = '{"Flags":2147483648,"TransactionType":"OfferCreate","Account":"rNsjHCBJWAa8JWTTCA2EEd5uREDTeyZiDM","TakerGets":"2000000","TakerPays":{"currency":"USD","issuer":"rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq"},"LastLedgerSequence":21611142,"Fee":"12","Sequence":4}'
    return await signTransaction(preparedTx.txJSON, secret)
}

async function submitOffer(signedTx: SignedTransaction): Promise<SubmittedTransaction | null> {
    return await submitTransaction(signedTx.signedTransaction)
}

async function verifyOffer(txId: string): Promise<VerifiedTransaction | null> {
    return await verifyTransaction(txId)
}

export const offerService = {
    buildOrderCancellation,
    buildCreateOffer,
    validateCreateOffer,
    sendOffer, 
    cancelOffer
}
