import React from 'react'
import SendForm from '../../library/SendForm'
import Currency from '../../rippled/model/Currency'
import Amount from '../../rippled/model/Amount'
import { TransactionBuilder } from '../../rippled/model/transaction/TransactionBuilder'
import Payment from '../../rippled/model/transaction/Payment'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setAmount, setDestAddress, setTxJson } from '../../store/transaction/actions'
import { PaymentBuilder } from '../../rippled/model/transaction/PaymentBuilder'

interface Props {
    next: () => void
    setAmount: (amount: string) => void
    setDestAddress: (destAddress: string) => void
    setTxJson: (json: string) => void
    srcAddress: string
}

class PrepareTransactionStep extends React.PureComponent<Props> {
    handleSubmit = async (destAddress: string, amount: string) => {
        const { srcAddress } = this.props
        const currency = new Currency("XRP", "$")
        const amt = new Amount(currency, amount!!)
        const builder = new TransactionBuilder(srcAddress, 'Payment')
        const paymentBuilder = new PaymentBuilder(amt, destAddress)
        const payment = new Payment(builder, paymentBuilder)
        const preparedPayment = await payment.preparePayment()
        console.log("prepped", preparedPayment)
        const { setAmount, setDestAddress, setTxJson } = this.props
        setAmount(amount)
        setDestAddress(destAddress)
        setTxJson(preparedPayment.txJSON)
        this.props.next()
    }
    
    render() {
        return <SendForm handleSubmit={this.handleSubmit}/>
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setAmount: (amount: string) => dispatch(setAmount(amount)),
        setDestAddress: (destAddress: string) => dispatch(setDestAddress(destAddress)),
        setTxJson: (json: string) => dispatch(setTxJson(json))
    }
}

const mapStateToProps = (store: any) => {
    return {
        srcAddress: store.tx.srcAddress
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrepareTransactionStep)