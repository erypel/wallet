import React from "react";
import PrepareTransactionStep from './PrepareTransactionStep'
import SignTransactionStep from './SignTransactionStep'

interface TransactionWizardProps {

}

export type Steps = 'Prepare' | 'Sign' //TODO make enums

interface TransactionWizardState {
    currentStep: Steps
}

export default class TransactionWizard extends React.PureComponent<TransactionWizardProps, TransactionWizardState> {
    constructor(props: TransactionWizardProps) {
        super(props)
        this.state = {
            currentStep: 'Prepare'
        }
    }

    next = () => {
        var { currentStep } = this.state
        if (currentStep === 'Prepare') {
            currentStep = 'Sign'
        }

        this.setState({
            currentStep: currentStep
        })
    }

    prev = () => {
        var { currentStep } = this.state
        if (currentStep === 'Sign') {
            currentStep = 'Prepare'
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