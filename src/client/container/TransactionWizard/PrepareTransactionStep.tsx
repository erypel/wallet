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
import toJsonObject from '../../utils/toJsonObject'
import prepareTransaction from '../../xrpl/api/utils/flow/prepareTransacton'
import xrpToDrops from '../../xrpl/api/utils/xrpToDrops'


interface Props {
    next: () => void
    setAmount: (amount: string) => void
    setDestAddress: (destAddress: string) => void
    setTxJson: (json: string) => void
    srcAddress: string
}

class PrepareTransactionStep extends React.PureComponent<Props> {
    handleSubmit = async (destAddress: string, xrp: string) => {
        const drops = xrpToDrops(xrp)
        const { srcAddress } = this.props
        const currency = new Currency("XRP", "$")
        const amt = new Amount(currency, drops!!)
        const builder = new TransactionBuilder(srcAddress, 'Payment')
        const paymentBuilder = new PaymentBuilder(amt, destAddress)
        const payment = new Payment(builder, paymentBuilder)
        const preparedPayment = await prepareTransaction(toJsonObject(payment))
        console.log("prepped", preparedPayment)
        const { setAmount, setDestAddress, setTxJson } = this.props
        setAmount(drops)
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