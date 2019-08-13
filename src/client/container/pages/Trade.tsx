import React from 'react'
import OfferForm from '../../component/OfferForm'
import Orderbook from '../Orderbook'
import ExchangeWallet from '../../component/ExchangeWallet'
import { connect } from 'react-redux'
import Wallet from '../../model/Wallet'
import OpenOrdersTable from '../../component/OpenOrdersTable'
import Offer from '../../xrpl/rippled/model/Offer'
import { AppState } from '../../store/rootReducer'
import TradingPairPicker from '../TradingPairPicker'

interface Props {
    activeWallet?: Wallet
    openOrders: Offer[]
}

class Trade extends React.PureComponent<Props> {
    render() {
        const { activeWallet, openOrders } = this.props
        return <div>
            <TradingPairPicker/>
            <ExchangeWallet activeWallet={activeWallet} baseCurrency='XRP' quoteCurrency='USD'/>
            {activeWallet && <OfferForm account={activeWallet.publicKey} secret={activeWallet.privateKey} baseCurrency='XRP' quoteCurrency='USD'/>}
            <Orderbook baseCurrency='XRP' quoteCurrency='USD'/>
            {activeWallet && <OpenOrdersTable openOrders={openOrders} activeWallet={activeWallet}/>}
        </div>
    }
}

const mapStateToProps = (store: AppState) => {
    const { wallet, orderbook } = store
    return {
        activeWallet: wallet.activeWallet,
        openOrders: orderbook.openOrders
    }
}

export default connect(mapStateToProps)(Trade)