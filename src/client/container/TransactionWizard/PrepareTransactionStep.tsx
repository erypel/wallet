import React from 'react'
import SendForm from '../../component/SendForm'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setAmount, setDestAddress, setPreparedTransaction } from '../../store/transaction/actions'
import Amount from '../../xrpl/api/model/Amount'
import Currency from '../../xrpl/api/model/Currency'
import { TransactionBuilder } from '../../xrpl/api/model/transaction/TransactionBuilder'
import { PaymentBuilder } from '../../xrpl/api/model/transaction/Payment/PaymentBuilder'
import Payment from '../../xrpl/api/model/transaction/Payment/Payment'
import xrpToDrops from '../../xrpl/api/utils/xrpToDrops'
import { transactionService } from '../../services/transactionService'
import PreparedTransaction from '../../xrpl/api/model/transaction/flow/PreparedTransaction';


interface Props {
    next: () => void
    setAmount: (amount: string) => void
    setDestAddress: (destAddress: string) => void
    setPreppedTx: (tx: PreparedTransaction) => void
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
        const preparedPayment = await transactionService.prepare(payment)
        if (preparedPayment === null) {
            throw Error('Error preparing payment!')
        }
        console.log("prepped", preparedPayment)
        const { setAmount, setDestAddress, setPreppedTx } = this.props
        setAmount(drops)
        setDestAddress(destAddress)
        setPreppedTx(preparedPayment)
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
        setPreppedTx: (tx: PreparedTransaction) => dispatch(setPreparedTransaction(tx))
    }
}

const mapStateToProps = (store: any) => {
    return {
        srcAddress: store.tx.srcAddress
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrepareTransactionStep)