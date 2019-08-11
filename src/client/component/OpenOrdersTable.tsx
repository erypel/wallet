import Offer from '../xrpl/rippled/model/Offer'
import React from 'react'
import { currencyService } from '../services/currencyService'
import Button from './Button'
import { offerService } from '../services/offerService'
import Wallet from '../model/Wallet'
import { fetchOpenOrders } from '../store/orderbook/actions'

interface Props {
    openOrders: Offer[]
    activeWallet: Wallet
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
        return openOrders.map((order: Offer) => {
            const { taker_gets: takerGets, taker_pays: takerPays, seq } = order
            return <tr key={`${seq}`}>
                <td>{currencyService.createCurrencyString(takerGets)}</td>
                <td>{currencyService.createCurrencyString(takerPays)}</td>
                <td><Button buttonText='Cancel Order' onClick={() => this.cancelOrder(seq)}/></td>
            </tr>
        })
    }

    cancelOrder = (seq: number) => {
        const { publicKey, privateKey } = this.props.activeWallet
        offerService.cancelOffer(publicKey, privateKey, seq)
        fetchOpenOrders(publicKey)
    }
}

export default OpenOrdersTable