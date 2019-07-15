import React from 'react'
import SendForm from '../SendForm'
import { Steps } from '../../rippled/model/Steps'
import Currency from '../../rippled/model/Currency'
import Amount from '../../rippled/model/Amount'
import Source from '../../rippled/model/Source'
import Destination from '../../rippled/model/Destination'
import { TransactionBuilder } from '../../rippled/model/transaction/TransactionBuilder'
import Payment from '../../rippled/model/transaction/Payment'
import SignedTransaction from '../../rippled/model/transaction/flow/SignedTransaction'

interface Props {
    currentStep: Steps
    next: (amount?: Amount, srcAddress?: string, srcSecret?: string, destAddress?: string, txJSON?: string, signedTransaction?: SignedTransaction) => void
}

export default class PrepareTransactionStep extends React.PureComponent<Props> {
    handleSubmit = async (srcAddress: string, srcSecret: string, destAddress: string, amount: string) => {
        const currency = new Currency("XRP", "$")
        const amt = new Amount(currency, amount)
        const source = new Source(srcAddress, undefined, amt)
        const destination = new Destination(destAddress, amt)
        const builder = new TransactionBuilder(source, destination)
        const payment = new Payment(builder)
        const preparedPayment = await payment.preparePayment()
        console.log("prepped", preparedPayment)
        this.props.next(amt, srcAddress, srcSecret, destAddress, preparedPayment.txJSON)
    }
    
    render() {
        const { currentStep } = this.props
        if(currentStep !== Steps.Prepare) {
            return null
        }
        return <SendForm handleSubmit={this.handleSubmit}/>
    }
}