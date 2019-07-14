import React from "react";
import { Steps } from "../rippled/model/Steps";

interface Props {
    currentStep: Steps
}

export default class SubmitTransactionStep extends React.PureComponent<Props> {
    submitTransaction = async () => {

    }
    
    render() {
        const { currentStep } = this.props
        if(currentStep !== Steps.Submit) {
            return null
        }
        return <p>Submitting...</p>
    }
}