import Wallet from '../model/Wallet'
import { getAccountLines } from '../xrpl/api/utils/account/accountLines'
import { TrustLine } from '../xrpl/api/model/account/AccountLines'
import TrustSetBuilder from '../xrpl/api/model/transaction/TrustSet/TrustSetBuilder'
import { TransactionBuilder } from '../xrpl/api/model/transaction/TransactionBuilder'
import Amount, { IssuerAmount, issuerAmountToAmount } from '../xrpl/api/model/Amount'
import TrustSet from '../xrpl/api/model/transaction/TrustSet/TrustSet'
import prepareTransaction from '../xrpl/api/utils/flow/prepareTransacton'
import PreparedTransaction from '../xrpl/api/model/transaction/flow/PreparedTransaction'
import signTransaction from '../xrpl/api/utils/flow/signTransaction'
import SignedTransaction from '../xrpl/api/model/transaction/flow/SignedTransaction'
import submitTransaction from '../xrpl/api/utils/flow/submitTransaction'
import SubmittedTransaction from '../xrpl/api/model/transaction/flow/SubmittedTransaction'
import Transaction from '../xrpl/api/model/transaction/Transaction'
import { PaymentBuilder } from '../xrpl/api/model/transaction/Payment/PaymentBuilder'
import Payment from '../xrpl/api/model/transaction/Payment/Payment'
import verifyTransaction from '../xrpl/api/utils/flow/verifyTransaction'
import getBalances from '../xrpl/api/utils/getBalances'

async function issue(issuingWallet: Wallet, receivingWallet: Wallet, issuance: IssuerAmount) {
    /** 
    * To create an issued currency, the issuing address sends a Payment transaction
    *  to an address which has a trust line to the issuer with a nonzero limit for
    * that currency. (You can also create issued currency by rippling "through" 
    * such a trust line.) You can erase issued currency by sending it back to the 
    * issuer.
    */
    // Check if there is a trust line between the receiver and the issuer with a nonzero limit for the currency
    const trustLine = await getTrustLineForCurrency(issuingWallet.publicKey, receivingWallet.publicKey, issuance.currency)
    if (!trustLine) {
        // try to create a trust line
        const txId = await createTrustLine(receivingWallet, issuance)
        await waitForTransaction()
        const verified = await verifyTransaction(txId)
        if(verified.outcome.result !== 'tesSuccess'){
            console.log(verified)
            throw Error('Creating trust line failed')
        }
    } 

    //send payment transaction
    const txId = await createPayment(issuingWallet, issuerAmountToAmount(issuance), receivingWallet.publicKey)
    await waitForTransaction()
    const verified = await verifyTransaction(txId)
    if(verified.outcome.result !== 'tesSuccess'){
        console.log(verified)
        throw Error('Sending tx failed')
    }

    //testing 
    const balances  = await getBalances(receivingWallet.publicKey)
    console.log('balances', balances)
}

async function waitForTransaction() {
    return new Promise( resolve => setTimeout(resolve, 20000) )
}

async function getTrustLineForCurrency(issuingAccount: string, receivingAccount: string, currency: string): Promise<TrustLine | undefined> {
    const accountLines = await getAccountLines(receivingAccount)
    const { lines } = accountLines
    return findLineForCurrency(issuingAccount, lines, currency)
}

/**
 *  Check if there is a trust line between the receiver and the issuer with a nonzero limit for the currency
 */ 
function findLineForCurrency(trustAccount: string, lines: TrustLine[], trustCurrency: string): TrustLine | undefined {
    for(var i = 0; i < lines.length; i++) {
        const line = lines[i]
        const { account, currency, limit } = line
        if (account === trustAccount && currency === trustCurrency && Number(limit) > 0) {
            return line
        }
    }
    return undefined
}

async function createPayment(wallet: Wallet, amount: Amount, destination: string): Promise<string> {
    const transactionBuilder = new TransactionBuilder(wallet.publicKey, 'Payment')
    const paymentBuilder = new PaymentBuilder(amount, destination)
    const payment = new Payment(transactionBuilder, paymentBuilder)
    return await sendTransaction(payment, wallet.privateKey)
}

async function createTrustLine(wallet: Wallet, limitAmount: IssuerAmount): Promise<string> {
    const transactionBuilder = new TransactionBuilder(wallet.publicKey, 'TrustSet')
    const trustSetBuilder = new TrustSetBuilder(limitAmount)
    const trustSet = new TrustSet(transactionBuilder, trustSetBuilder)
    return await sendTransaction(trustSet, wallet.privateKey)
}

async function sendTransaction(tx: Transaction, secret: string): Promise<string> {
    try {
        return await prepareTransaction(tx).then((preppedTx: PreparedTransaction) => {
            return signTransaction(preppedTx.txJSON, secret).then((signedTx: SignedTransaction | null) => {
                if(!signedTx) {
                    throw Error('Error signing')
                }
                return submitTransaction(signedTx.signedTransaction).then((submittedTx: SubmittedTransaction | null) => {
                    if(!submittedTx) {
                        throw Error('error submitting')
                    }
                    return signedTx.id
                })
            })
        })
    } catch(error) {
        console.log("error sending tx", error)
        throw error
    }
}

export const issueService = {
    issue
}