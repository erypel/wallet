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
    baseCurrency: string
    quoteCurrency: string
}

class Trade extends React.PureComponent<Props> {
    render() {
        const { activeWallet, openOrders, baseCurrency, quoteCurrency } = this.props
        return <div>
            <TradingPairPicker/>
            <ExchangeWallet activeWallet={activeWallet} baseCurrency={baseCurrency} quoteCurrency={quoteCurrency}/>
            {activeWallet && <OfferForm account={activeWallet.publicKey} secret={activeWallet.privateKey} baseCurrency={baseCurrency} quoteCurrency={quoteCurrency}/>}
            <Orderbook baseCurrency={baseCurrency} quoteCurrency={quoteCurrency}/>
            {activeWallet && <OpenOrdersTable openOrders={openOrders} activeWallet={activeWallet}/>}
        </div>
    }
}

const mapStateToProps = (store: AppState) => {
    const { wallet, orderbook } = store
    const { openOrders, baseCurrency, quoteCurrency } = orderbook
    return {
        activeWallet: wallet.activeWallet,
        openOrders: openOrders,
        baseCurrency: baseCurrency,
        quoteCurrency: quoteCurrency
    }
}

export default connect(mapStateToProps)(Trade)