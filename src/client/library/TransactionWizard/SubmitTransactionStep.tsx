import React from 'react'
import submitTransaction from '../../rippled/utils/flow/submitTransaction'
import SignedTransaction from '../../rippled/model/transaction/flow/SignedTransaction'
import Amount from '../../rippled/model/Amount'

interface Props {
    signedTransaction: SignedTransaction
    next: (amount?: Amount, srcAddress?: string, srcSecret?: string, destAddress?: string, txJSON?: string, signedTransaction?: SignedTransaction) => void
}

export default class SubmitTransactionStep extends React.PureComponent<Props> {
    submitTransaction = async () => {
        const { signedTransaction, next } = this.props
        const submitted = await submitTransaction(signedTransaction.signedTransaction)
        console.log("submitted", submitted)
        alert(`submitted ${submitted.engine_result}`)
        next(undefined, undefined, undefined, undefined, undefined, signedTransaction)
    }
    
    render() {
        this.submitTransaction()
        return <p>Submitting...</p>
    }
}