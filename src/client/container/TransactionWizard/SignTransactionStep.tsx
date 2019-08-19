import React from 'react'
import Button from '../../component/Button'
import { Dispatch } from 'redux'
import { setSignedTransaction } from '../../store/transaction/actions'
import { connect } from 'react-redux'
import SignedTransaction from '../../xrpl/api/model/transaction/flow/SignedTransaction'
import signTransaction from '../../xrpl/api/utils/flow/signTransaction'
import dropsToXrp from '../../xrpl/api/utils/dropsToXrp'


interface Props {
    next: () => void
    setSignedTransaction: (signedTx: SignedTransaction) => void
    txJson: string
    srcSecret: string
    amount: string
    srcAddress: string
    destAddress: string
}

class PrepareTransactionStep extends React.PureComponent<Props> {
    signTransaction = async () => {
        const { txJson, srcSecret } = this.props
        const { next, setSignedTransaction } = this.props
        const signedTx = await signTransaction(txJson!!, srcSecret!!)
        if(signedTx) {
            setSignedTransaction(signedTx)
            console.log('signed', signedTx)
            next()
        } else {
            console.log("error signing transaction")
        }
    }
    
    render() {
        const { amount, srcAddress, destAddress } = this.props
        return <div className='container-white'>
            <p>Are you sure that you want to send {dropsToXrp(amount)} XRP from {srcAddress} to {destAddress}?</p>
            <Button buttonText={'Confirm'} onClick={this.signTransaction} className='button-green'/>
        </div>
    }
}

const mapStateToProps = (store: any) => {
    const { tx } = store
    const { txJSON, srcAddress, srcSecret, amount, destAddress } = tx
    return {
        txJson: txJSON,
        srcSecret: srcSecret,
        amount: amount,
        srcAddress: srcAddress,
        destAddress: destAddress
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setSignedTransaction: (signedTx: SignedTransaction) => dispatch(setSignedTransaction(signedTx)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrepareTransactionStep)