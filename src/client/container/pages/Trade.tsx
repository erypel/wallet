import React from 'react'
import OfferForm from '../../component/OfferForm'
import Orderbook from '../Orderbook'
import ExchangeWallet from '../ExchangeWallet'
import { connect } from 'react-redux'
import Wallet from '../../model/Wallet'

interface Props {
    activeWallet?: Wallet
}

class Trade extends React.PureComponent<Props> {
    render() {
        const { activeWallet } = this.props
        return <div>
            <ExchangeWallet activeWallet={activeWallet}/>
            {activeWallet && <OfferForm account={activeWallet.publicKey} secret={activeWallet.privateKey} baseCurrency='XRP' quoteCurrency='USD'/>}
            <Orderbook baseCurrency='XRP' quoteCurrency='USD'/>
        </div>
    }
}

const mapStateToProps = (store: any) => {
    return {
        activeWallet: store.wallet.activeWallet
    }
}

export default connect(mapStateToProps)(Trade)