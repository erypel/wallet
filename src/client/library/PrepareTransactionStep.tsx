import React from "react";
import SendForm from "./SendForm";
import { Steps } from "../rippled/model/Steps";

interface Props {
    currentStep: Steps
}

export default class PrepareTransactionStep extends React.PureComponent<Props> {
    render() {
        const { currentStep } = this.props
        if(currentStep !== Steps.Prepare) {
            return null
        }
        return <SendForm/>
    }
}