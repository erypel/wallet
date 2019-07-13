import React from "react";
import { Steps } from "./TransactionWizard";
import SendForm from "./SendForm";

interface Props {
    currentStep: Steps
}

export default class PrepareTransactionStep extends React.PureComponent<Props> {
    render() {
        const { currentStep } = this.props
        if(currentStep !== 'Prepare') {
            return null
        }
        return <SendForm/>
    }
}