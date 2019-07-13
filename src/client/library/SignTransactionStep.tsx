import React from "react";
import { Steps } from "../rippled/model/Steps";

interface Props {
    currentStep: Steps
}

export default class PrepareTransactionStep extends React.PureComponent<Props> {
    render() {
        const { currentStep } = this.props
        if(currentStep !== Steps.Sign) {
            return null
        }
        return <p>Sign Step</p>
    }
}