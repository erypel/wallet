import React from "react"
import { Steps } from "../rippled/model/Steps"
import Button from "./Button"
import Amount from "../rippled/model/Amount"
import signTransaction from "../rippled/utils/flow/signTransaction";
import SignedTransaction from "../rippled/model/transaction/SignedTransaction";

interface Props {
    currentStep: Steps
    amount: Amount
    srcAddress: string
    srcSecret: string
    destAddress: string
    txJSON: string
    next: (amount?: Amount, srcAddress?: string, srcSecret?: string, destAddress?: string, txJSON?: string, signedTransaction?: SignedTransaction) => void
}

export default class PrepareTransactionStep extends React.PureComponent<Props> {
    signTransaction = async () => {
        const { txJSON, srcSecret, next } = this.props
        const signedTx = await signTransaction(txJSON, srcSecret)
        console.log('signed', signedTx)
        next(undefined, undefined, undefined, undefined, undefined, signedTx )
    }
    
    render() {
        const { currentStep, amount, srcAddress, destAddress } = this.props
        if(currentStep !== Steps.Sign) {
            return null
        }
        return <div>
            <p>Are you sure that you want to send {amount.value} {amount.currency} from {srcAddress} to ${destAddress}?</p>
            <Button buttonText={'Confirm'} onClick={this.signTransaction}/>
        </div>
    }
}