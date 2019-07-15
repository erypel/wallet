import React from "react";
import verifyTransaction from "../../rippled/utils/flow/verifyTransaction";
import VerifiedTransaction from '../../rippled/model/transaction/flow/VerifiedTransaction'
import TransactionStore from "../../redux/store/TransactionStore";

interface Props {}

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
        const { signedTransaction } = TransactionStore.getState()
        await this.waitForTransaction()
        const verifiedTransaction = await verifyTransaction(signedTransaction!!.id)
        console.log('verified', verifiedTransaction)
        this.setState({
            verifiedTransaction: verifiedTransaction
        })
    }
    
    componentDidMount() {
        this.verifyTransaction()
    }

    render() {
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