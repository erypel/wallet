import React from 'react'
import WalletPicker from '../WalletPicker'
import Wallet from '../../model/Wallet'
import { AppState } from '../../store/rootReducer'
import { connect } from 'react-redux'
import IssueForm from '../../component/IssueForm'

interface Props {
    activeWallet?: Wallet
}

class Issue extends React.PureComponent<Props> {
    render() {
        const { activeWallet } = this.props
        return <div>
            <WalletPicker displayCurrency='XRP' activeWallet={activeWallet}/>
            <IssueForm/>
        </div>
    }
}

const mapStateToProps = (store: AppState) => {
    const { wallet } = store
    return {
        activeWallet: wallet.activeWallet
    }
}

export default connect(mapStateToProps)(Issue)