import React from "react";
import PrepareTransactionStep from './PrepareTransactionStep'
import SignTransactionStep from './SignTransactionStep'
import { Steps } from "../rippled/model/Steps";

interface TransactionWizardProps {

}

export type Step = Steps

interface TransactionWizardState {
    currentStep: Step
}

export default class TransactionWizard extends React.PureComponent<TransactionWizardProps, TransactionWizardState> {
    constructor(props: TransactionWizardProps) {
        super(props)
        this.state = {
            currentStep: Steps.Prepare
        }
    }

    next = () => {
        var { currentStep } = this.state
        if (currentStep === Steps.Prepare) {
            currentStep = Steps.Sign
        }

        this.setState({
            currentStep: currentStep
        })
    }

    render() {
        const { currentStep } = this.state
        return <div>
            <PrepareTransactionStep currentStep={currentStep}/>
            <SignTransactionStep currentStep={currentStep}/>
        </div>
    }
}