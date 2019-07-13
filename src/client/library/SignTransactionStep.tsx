import React from "react";
import { Steps } from "./TransactionWizard";

interface Props {
    currentStep: Steps
}

export default class PrepareTransactionStep extends React.PureComponent<Props> {
    render() {
        const { currentStep } = this.props
        if(currentStep !== 'Sign') {
            return null
        }
        return <p>Sign Step</p>
    }
}