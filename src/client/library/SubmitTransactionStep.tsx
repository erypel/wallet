import React from "react"
import { Steps } from "../rippled/model/Steps"
import submitTransaction from "../rippled/utils/flow/submitTransaction";

interface Props {
    currentStep: Steps
    signedTransaction: string
}

export default class SubmitTransactionStep extends React.PureComponent<Props> {
    submitTransaction = async () => {
        const { signedTransaction } = this.props
        const submitted = await submitTransaction(signedTransaction)
        console.log("submitted", submitted)
        alert(`submitted ${submitted.engine_result}`)
    }
    
    render() {
        const { currentStep } = this.props
        if(currentStep !== Steps.Submit) {
            return null
        }
        this.submitTransaction()
        return <p>Submitting...</p>
    }
}