import React from 'react'
import SendForm from '../../component/SendForm'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setAmount, setDestAddress, setTxJson } from '../../store/transaction/actions'
import Amount from '../../xrpl/api/model/Amount'
import Currency from '../../xrpl/api/model/Currency'
import { TransactionBuilder } from '../../xrpl/api/model/transaction/TransactionBuilder'
import { PaymentBuilder } from '../../xrpl/api/model/transaction/Payment/PaymentBuilder'
import Payment from '../../xrpl/api/model/transaction/Payment/Payment'


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