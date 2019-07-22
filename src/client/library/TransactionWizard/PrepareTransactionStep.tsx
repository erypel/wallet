import React from 'react'
import SendForm from '../SendForm'
import Currency from '../../rippled/model/Currency'
import Amount from '../../rippled/model/Amount'
import Source from '../../rippled/model/Source'
import Destination from '../../rippled/model/Destination'
import { TransactionBuilder } from '../../rippled/model/transaction/TransactionBuilder'
import Payment from '../../rippled/model/transaction/Payment'
import TransactionStore, { setTxJson, setDestAddress, setAmount } from '../../redux/store/TransactionStore';

interface Props {
    next: () => void
}

export default class PrepareTransactionStep extends React.PureComponent<Props> {
    handleSubmit = async (destAddress: string, amount: string) => {
        const { srcAddress } = TransactionStore.getState()
        const currency = new Currency("XRP", "$")
        const amt = new Amount(currency, amount!!)
        const source = new Source(srcAddress!!, undefined, amt)
        const destination = new Destination(destAddress!!, amt)
        const builder = new TransactionBuilder(source, destination)
        const payment = new Payment(builder)
        const preparedPayment = await payment.preparePayment()
        console.log("prepped", preparedPayment)
        setAmount(amount)
        setDestAddress(destAddress)
        setTxJson(preparedPayment.txJSON)
        this.props.next()
    }
    
    render() {
        return <SendForm handleSubmit={this.handleSubmit}/>
    }
}