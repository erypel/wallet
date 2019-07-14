import React from "react";
import { Steps } from "../rippled/model/Steps";
import Button from "./Button";

interface Props {
    currentStep: Steps
}

export default class PrepareTransactionStep extends React.PureComponent<Props> {
    signTransaction = () => {
        alert('signed!')
    }
    
    render() {
        const { currentStep } = this.props
        if(currentStep !== Steps.Sign) {
            return null
        }
        return <div>
            <p>Are you sure?</p>
            <Button buttonText={'Confirm'} onClick={this.signTransaction}/>
            </div>
    }
}