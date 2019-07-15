import { Step } from "./TransactionWizard";
import { Steps } from "../../rippled/model/Steps";
import React from "react";
import verifyTransaction from "../../rippled/utils/flow/verifyTransaction";
import VerifiedTransaction from '../../rippled/model/transaction/flow/VerifiedTransaction'

interface Props {
    currentStep: Step
    transactionId: string
}

interface State {
    verifiedTransaction?: VerifiedTransaction
}

export default class VerifyTransactionStep extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            verifiedTransaction: undefined
        }
    }

    waitForTransaction = () => {
        return new Promise( resolve => setTimeout(resolve, 10000) );
    }

    verifyTransaction = async () => {
        const { transactionId } = this.props
        await this.waitForTransaction()
        const verifiedTransaction = await verifyTransaction(transactionId)
        console.log('verified', verifiedTransaction)
        this.setState({
            verifiedTransaction: verifiedTransaction
        })
    }
    
    componentDidMount() {
        this.verifyTransaction()
    }

    render() {
        const { currentStep } = this.props
        if(currentStep !== Steps.Verify) {
            return null
        }
        const { verifiedTransaction } = this.state
        if(!verifiedTransaction) {
            return <div><p>Loading...</p></div>
        }
        const { result } = verifiedTransaction.outcome
        return <div>
            <p>Outcome: {result}</p>
        </div>
    }
}