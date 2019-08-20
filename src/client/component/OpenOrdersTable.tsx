import React from 'react'
import { currencyService } from '../services/currencyService'
import Button from './Button'
import { offerService } from '../services/offerService'
import Wallet from '../model/Wallet'
import { fetchOpenOrders } from '../store/orderbook/actions'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { AccountOffer } from '../xrpl/api/model/account/AccountOffers'

interface Props {
    openOrders: AccountOffer[]
    activeWallet: Wallet
    getOpenOrders: (address: string) => void
}

class OpenOrdersTable extends React.PureComponent<Props> {
    render() {
        return <div>
            <h1>Open Orders</h1>
            <table>
                <thead>
                    <tr>
                        <th>Taker Gets</th>
                        <th>Taker Pays</th>
                        <th>Cancel</th>
                    </tr>
                </thead>
                <tbody>
                    {this.mapOpenOrders()}
                </tbody>
            </table>
        </div>
    }

    mapOpenOrders = () => {
        const { openOrders } = this.props
        if (openOrders.length === 0) {
            return <tr key={'no-orders'}>
            <td colSpan={3}>No open orders</td>
            </tr>
        }
        return openOrders.map((order: AccountOffer) => {
            const { taker_gets: takerGets, taker_pays: takerPays, seq } = order
            return <tr key={`${seq}`}>
                <td>{currencyService.createCurrencyString(takerGets)}</td>
                <td>{currencyService.createCurrencyString(takerPays)}</td>
                <td><Button buttonText='Cancel Order' onClick={() => this.cancelOrder(seq)}/></td>
            </tr>
        })
    }

    cancelOrder = (seq: number) => {
        const { getOpenOrders, activeWallet } = this.props
        const { publicKey, privateKey } = activeWallet
        offerService.cancelOffer(publicKey, privateKey, seq).then(() => {
            getOpenOrders(publicKey)
        })
        
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getOpenOrders: (address: string) => dispatch(fetchOpenOrders(address))
    }
}

export default connect(null, mapDispatchToProps)(OpenOrdersTable)