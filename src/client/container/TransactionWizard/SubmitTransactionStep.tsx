import React from 'react'
import { connect } from 'react-redux'
import SignedTransaction from '../../xrpl/api/model/transaction/flow/SignedTransaction'
import submitTransaction from '../../xrpl/api/utils/flow/submitTransaction'


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
        return <div className='container-white'><p>Submitting...</p></div>
    }
}

const mapStateToProps = (store: any) => {
    return {
        signedTx: store.tx.signedTransaction
    }
}

export default connect(mapStateToProps)(SubmitTransactionStep)