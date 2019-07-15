import React from 'react'
import Button from '../Button'
import signTransaction from '../../rippled/utils/flow/signTransaction'
import TransactionStore, { setSignedTransaction } from '../../redux/store/TransactionStore'

interface Props {
    next: () => void
}

export default class PrepareTransactionStep extends React.PureComponent<Props> {
    signTransaction = async () => {
        const { txJSON, srcSecret } = TransactionStore.getState()
        const { next } = this.props
        const signedTx = await signTransaction(txJSON!!, srcSecret!!)
        setSignedTransaction(signedTx)
        console.log('signed', signedTx)
        next()
    }
    
    render() {
        const { amount, srcAddress, destAddress } = TransactionStore.getState()
        return <div>
            <p>Are you sure that you want to send {amount} from {srcAddress} to ${destAddress}?</p>
            <Button buttonText={'Confirm'} onClick={this.signTransaction}/>
        </div>
    }
}