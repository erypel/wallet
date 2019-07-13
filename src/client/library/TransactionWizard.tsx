import React from "react";

interface TransactionWizardProps {

}

type Steps = 'Prepare' | 'Sign'

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
}