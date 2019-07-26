import React from 'react'
import submitTransaction from '../../rippled/utils/flow/submitTransaction'
import SignedTransaction from '../../rippled/model/transaction/flow/SignedTransaction';
import { connect } from 'react-redux'


interface Props {
    next: () => void
    signedTx: SignedTransaction
}

class SubmitTransactionStep extends React.PureComponent<Props> {
    submitTransaction = async () => {
        const { signedTx } = this.props
        const { next } = this.props
        const submitted = await submitTransaction(signedTx!!.signedTransaction)
        console.log("submitted", submitted)
        next()
    }
    
    render() {
        this.submitTransaction()
        return <p>Submitting...</p>
    }
}

const mapStateToProps = (store: any) => {
    return {
        signedTx: store.tx.signedTransaction
    }
}

export default connect(mapStateToProps)(SubmitTransactionStep)