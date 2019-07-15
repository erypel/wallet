import React from "react";
import PrepareTransactionStep from './PrepareTransactionStep'
import SignTransactionStep from './SignTransactionStep'
import { Steps } from "../rippled/model/Steps";
import Amount from "../rippled/model/Amount";
import SubmitTransactionStep from "./SubmitTransactionStep";

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
    signedTransaction?: string
}

export default class TransactionWizard extends React.PureComponent<TransactionWizardProps, TransactionWizardState> {
    constructor(props: TransactionWizardProps) {
        super(props)
        this.state = {
            currentStep: Steps.Prepare
        }
    }

    next = (amount?: Amount, srcAddress?: string, srcSecret?: string, destAddress?: string, txJSON?: string, signedTransaction?: string) => {
        var { currentStep } = this.state
        const { Prepare, Sign, Submit } = Steps
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
        }
    }

    render() {
        const { currentStep, amount, srcAddress, srcSecret, destAddress, txJSON, signedTransaction } = this.state
        return <div>
            <PrepareTransactionStep currentStep={currentStep} next={this.next}/>
            <SignTransactionStep 
                currentStep={currentStep}
                amount={amount!!}
                srcAddress={srcAddress!!}
                srcSecret={srcSecret!!}
                destAddress={destAddress!!}
                txJSON={txJSON!!}
                next={this.next}
            />
            <SubmitTransactionStep currentStep={currentStep} signedTransaction={signedTransaction!!}/>
        </div>
    }
}