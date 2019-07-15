import React from 'react'
import PrepareTransactionStep from './PrepareTransactionStep'
import SignTransactionStep from './SignTransactionStep'
import Amount from '../../rippled/model/Amount'
import SubmitTransactionStep from './SubmitTransactionStep'
import VerifyTransactionStep from './VerifyTransactionStep'
import SignedTransaction from '../../rippled/model/transaction/flow/SignedTransaction'
import { Steps } from '../../rippled/model/Steps'

interface TransactionWizardProps {

}

export type Step = Steps

interface TransactionWizardState {
    currentStep: Step
    amount?: Amount
    srcAddress?: string
    srcSecret?: string
    destAddress?: string
    txJSON?: string
    signedTransaction?: SignedTransaction
    transactionId?: string
}

export default class TransactionWizard extends React.PureComponent<TransactionWizardProps, TransactionWizardState> {
    constructor(props: TransactionWizardProps) {
        super(props)
        this.state = {
            currentStep: Steps.Prepare
        }
    }

    next = (amount?: Amount, srcAddress?: string, srcSecret?: string, destAddress?: string, txJSON?: string, signedTransaction?: SignedTransaction) => {
        var { currentStep } = this.state
        const { Prepare, Sign, Submit, Verify } = Steps
        if (currentStep === Prepare) {
            currentStep = Sign
            this.setState({
                currentStep: currentStep,
                amount: amount,
                srcAddress: srcAddress,
                srcSecret: srcSecret,
                destAddress: destAddress,
                txJSON: txJSON
            })
        } else if (currentStep === Sign) {
            currentStep = Submit
            this.setState({
                currentStep: currentStep,
                signedTransaction: signedTransaction
            })
        } else if (currentStep === Submit) {
            currentStep = Verify
            this.setState({
                currentStep: currentStep,
                transactionId: signedTransaction!!.id
            })
        }
    }

    render() {
        const { currentStep, amount, srcAddress, srcSecret, destAddress, txJSON, signedTransaction, transactionId } = this.state
        const { Prepare, Sign, Submit, Verify } = Steps
        return <div>
            {currentStep === Prepare && <PrepareTransactionStep currentStep={currentStep} next={this.next}/>}
            {currentStep === Sign && <SignTransactionStep 
                currentStep={currentStep}
                amount={amount!!}
                srcAddress={srcAddress!!}
                srcSecret={srcSecret!!}
                destAddress={destAddress!!}
                txJSON={txJSON!!}
                next={this.next}
            />}
            {currentStep === Submit && <SubmitTransactionStep currentStep={currentStep} signedTransaction={signedTransaction!!} next={this.next}/>}
            {currentStep === Verify && <VerifyTransactionStep currentStep={currentStep} transactionId={transactionId!!}/>}
        </div>
    }
}