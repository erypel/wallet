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
import { IssuerCurrency } from '../../xrpl/api/utils/issuers'
import Subheader from '../../component/Subheader';

interface Props {
    activeWallet?: Wallet
    openOrders: AccountOffer[]
    baseCurrency: IssuerCurrency
    quoteCurrency: IssuerCurrency
    bids: Bid[],
    asks: Ask[],
    loadOrderbook: (
        baseCurrency: string,
        counterCurrency: string
    ) => void
}

class Exchange extends React.PureComponent<Props> {
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
        const { 
            activeWallet, openOrders, baseCurrency, quoteCurrency, bids, asks 
        } = this.props
        return <div>
            <Subheader title='Exchange'/>
            <div><TradingPairPicker className='dropdown container-black'/></div>
            <div className='column width-1-3'>
                <div className='row width-1-1'>
                    <ExchangeWallet
                        activeWallet={activeWallet} 
                        baseCurrency={baseCurrency} 
                        quoteCurrency={quoteCurrency}
                        className='table-dashboard'
                    />
                    {activeWallet && <OfferForm 
                        account={activeWallet.publicKey} 
                        secret={activeWallet.privateKey} 
                        baseCurrency={baseCurrency} 
                        quoteCurrency={quoteCurrency}
                        className='dashboard'
                    />}
                </div>
            </div>
            <div className='column width-2-3'>
                <Orderbook
                    className='table-dashboard'
                    baseCurrency={baseCurrency} 
                    quoteCurrency={quoteCurrency} 
                    bids={bids} 
                    asks={asks}
                />
                {activeWallet && <OpenOrdersTable 
                    className='table-dashboard'
                    openOrders={openOrders} 
                    activeWallet={activeWallet}
                />}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)