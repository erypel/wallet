import React from 'react'
import submitTransaction from '../../rippled/utils/flow/submitTransaction'
import TransactionStore from '../../redux/store/TransactionStore'

interface Props {
    next: () => void
}

export default class SubmitTransactionStep extends React.PureComponent<Props> {
    submitTransaction = async () => {
        const { signedTransaction } = TransactionStore.getState()
        const { next } = this.props
        const submitted = await submitTransaction(signedTransaction!!.signedTransaction)
        console.log("submitted", submitted)
        next()
    }
    
    render() {
        this.submitTransaction()
        return <p>Submitting...</p>
    }
}