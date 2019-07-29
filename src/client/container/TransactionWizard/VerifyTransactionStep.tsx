import React from 'react'
import verifyTransaction from '../../rippled/utils/flow/verifyTransaction'
import VerifiedTransaction from '../../rippled/model/transaction/flow/VerifiedTransaction'
import SignedTransaction from "../../rippled/model/transaction/flow/SignedTransaction";
import { connect } from 'react-redux'

interface Props {
    signedTx: SignedTransaction
}

interface State {
    verifiedTransaction?: VerifiedTransaction
}

class VerifyTransactionStep extends React.PureComponent<Props, State> {
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
        const { signedTx } = this.props
        await this.waitForTransaction()
        const verifiedTransaction = await verifyTransaction(signedTx!!.id)
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
            return <div className='container-white'><p>Loading...</p></div>
        }
        const { result } = verifiedTransaction.outcome
        return <div className='container-white'>
            <p>Outcome: {result}</p>
        </div>
    }
}

const mapStateToProps = (store: any) => {
    return {
        signedTx: store.tx.signedTransaction
    }
}

export default connect(mapStateToProps)(VerifyTransactionStep)