import React from 'react'
import { connect } from 'react-redux'
import TransactionWizard from '../TransactionWizard/TransactionWizard'
import { Link } from 'react-router-dom'
import Balance from '../Balance'
import { WalletMap } from '../../store/wallet/types'
import Tabs from '../Tabs'
import Subheader from '../../component/Subheader'
import TransactionTable from '../../component/TransactionTable'
import { AccountTransaction } from '../../xrpl/api/model/account/AccountTransactions'
import { AppState } from '../../store/rootReducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { setTransactionsForAccount } from '../../store/transaction/actions'

interface Props {
    match: any
    publicKey: string
    wallets: WalletMap
    transactions: AccountTransaction[]
    isLoadingTransactions: boolean
    loadTransactions: (account: string) => void
}

class Wallet extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props)
        const { loadTransactions, match } = props
        loadTransactions(match.params.publicKey)
    }

    render() {
        const { wallets, transactions, isLoadingTransactions, match } = this.props
        const { publicKey } = match.params
        const privateKey = wallets[publicKey].privateKey
        if(!privateKey) {
            return <div>ERROR</div>
        }
        return <>
            <Subheader title='Send and Receive'/>
            <div className='section'>
                <div className='content'>
                    <div className='width-2-3'>
                        <Balance address={publicKey}/>
                        <br/>
                        <Tabs>
                            <div data-label="Send">
                                <TransactionWizard publicKey={publicKey} privateKey={privateKey}/>
                            </div>
                            <div data-label="Receive">
                                <div className='container-white'>Send XRP here: {publicKey}</div>
                            </div>
                        </Tabs>
                        <br/>
                        <Link to='/home'>Back to list</Link>
                        <br/>
                    </div>
                </div>
                <div className='feature'>
                    <TransactionTable transactions={transactions} isLoading={isLoadingTransactions} account={publicKey}/>
                </div>
            </div>
        </>
    }
}

const mapStateToProps = (store: AppState) => {
    const { wallet, tx } = store
    return {
        wallets: wallet.wallets,
        transactions: tx.accountTransactions,
        isLoadingTransactions: tx.isLoadingAccountTransactions
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        loadTransactions: (account: string) => dispatch(
            setTransactionsForAccount(account)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)