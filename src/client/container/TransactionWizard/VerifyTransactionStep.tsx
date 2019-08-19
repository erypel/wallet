import React from 'react'
import { connect } from 'react-redux'
import SignedTransaction from '../../xrpl/api/model/transaction/flow/SignedTransaction'
import VerifiedTransaction from '../../xrpl/api/model/transaction/flow/VerifiedTransaction'
import { transactionService } from '../../services/transactionService'

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
        const verifiedTransaction = await transactionService.verify(signedTx!!.id)
        if (verifiedTransaction === null) {
            throw Error('Error verifying transaction!')
        }
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