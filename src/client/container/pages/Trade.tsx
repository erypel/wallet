import React from 'react'
import OfferForm from '../../component/OfferForm'
import Orderbook from '../Orderbook'
import ExchangeWallet from '../../component/ExchangeWallet'
import { connect } from 'react-redux'
import Wallet from '../../model/Wallet'
import OpenOrdersTable from '../../component/OpenOrdersTable'
import { AppState } from '../../store/rootReducer'
import TradingPairPicker from '../TradingPairPicker'
import { fetchOrderbook } from '../../store/orderbook/actions'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import Bid from '../../xrpl/api/model/transaction/Orderbook/Bid'
import Ask from '../../xrpl/api/model/transaction/Orderbook/Ask'
import unsubscribeFromBook from '../../xrpl/api/utils/unsubscribeFromOrderbook'
import { AccountOffer } from '../../xrpl/api/model/account/AccountOffers'

interface Props {
    activeWallet?: Wallet
    openOrders: AccountOffer[]
    baseCurrency: string
    quoteCurrency: string
    bids: Bid[],
    asks: Ask[],
    loadOrderbook: (
        baseCurrency: string,
        counterCurrency: string
    ) => void
}

class Trade extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props)
        const { baseCurrency, quoteCurrency, loadOrderbook } = props
        loadOrderbook(baseCurrency, quoteCurrency)
    }

    componentWillReceiveProps(newProps: Props) {
        const oldProps = this.props
        const { baseCurrency: oldBase, quoteCurrency: oldQuote } = oldProps
        const { baseCurrency: newBase, quoteCurrency: newQuote } = newProps
        if(oldBase !== newBase || oldQuote !== newQuote) {
            unsubscribeFromBook(oldBase, oldQuote)
            this.props.loadOrderbook(newBase, newQuote)
        }
    }

    componentWillUnmount() {
        const { baseCurrency, quoteCurrency } = this.props
        unsubscribeFromBook(baseCurrency, quoteCurrency)
    }

    render() {
        const { activeWallet, openOrders, baseCurrency, quoteCurrency, bids, asks } = this.props
        return <div>
            <TradingPairPicker/>
            <ExchangeWallet activeWallet={activeWallet} baseCurrency={baseCurrency} quoteCurrency={quoteCurrency}/>
            {activeWallet && <OfferForm account={activeWallet.publicKey} secret={activeWallet.privateKey} baseCurrency={baseCurrency} quoteCurrency={quoteCurrency}/>}
            <Orderbook baseCurrency={baseCurrency} quoteCurrency={quoteCurrency} bids={bids} asks={asks}/>
            {activeWallet && <OpenOrdersTable openOrders={openOrders} activeWallet={activeWallet}/>}
        </div>
    }
}

const mapStateToProps = (store: AppState) => {
    const { wallet, orderbook } = store
    const { openOrders, baseCurrency, quoteCurrency, bids, asks } = orderbook
    return {
        activeWallet: wallet.activeWallet,
        openOrders: openOrders,
        baseCurrency: baseCurrency,
        quoteCurrency: quoteCurrency,
        bids: bids,
        asks: asks
    }
}


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        loadOrderbook: (
            baseCurrency: string,
            counterCurrency: string
        ) => dispatch(
            fetchOrderbook(
                baseCurrency,
                counterCurrency
            )
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade)