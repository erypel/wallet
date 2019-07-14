import React from "react";
import PrepareTransactionStep from './PrepareTransactionStep'
import SignTransactionStep from './SignTransactionStep'
import { Steps } from "../rippled/model/Steps";
import Amount from "../rippled/model/Amount";

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
}

export default class TransactionWizard extends React.PureComponent<TransactionWizardProps, TransactionWizardState> {
    constructor(props: TransactionWizardProps) {
        super(props)
        this.state = {
            currentStep: Steps.Prepare
        }
    }

    next = (amount?: Amount, srcAddress?: string, srcSecret?: string, destAddress?: string, txJSON?: string) => {
        var { currentStep } = this.state
        if (currentStep === Steps.Prepare) {
            currentStep = Steps.Sign
        }

        this.setState({
            currentStep: currentStep,
            amount: amount,
            srcAddress: srcAddress,
            srcSecret: srcSecret,
            destAddress: destAddress,
            txJSON: txJSON
        })
    }

    render() {
        const { currentStep, amount, srcAddress, srcSecret, destAddress, txJSON } = this.state
        return <div>
            <PrepareTransactionStep currentStep={currentStep} next={this.next}/>
            <SignTransactionStep 
                currentStep={currentStep}
                amount={amount!!}
                srcAddress={srcAddress!!}
                srcSecret={srcSecret!!}
                destAddress={destAddress!!}
                txJSON={txJSON!!}
            />
        </div>
    }
}