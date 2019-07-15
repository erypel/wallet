import React from 'react'
import { Steps } from '../../rippled/model/Steps'
import submitTransaction from '../../rippled/utils/flow/submitTransaction'
import SignedTransaction from '../../rippled/model/transaction/flow/SignedTransaction'
import Amount from '../../rippled/model/Amount'

interface Props {
    currentStep: Steps
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
        const { currentStep } = this.props
        if(currentStep !== Steps.Submit) {
            return null
        }
        this.submitTransaction()
        return <p>Submitting...</p>
    }
}