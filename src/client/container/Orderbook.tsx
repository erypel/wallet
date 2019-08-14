import React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '../store/rootReducer'
import { fetchOrderbook } from '../store/orderbook/actions'
import Bid from '../xrpl/api/model/transaction/Orderbook/Bid'
import Ask from '../xrpl/api/model/transaction/Orderbook/Ask'

interface Props {
    baseCurrency: string,
    quoteCurrency: string,
    bids: Bid[]
    asks: Ask[]
}

class Orderbook extends React.PureComponent<Props> {
    render() {
        const { bids, asks } = this.props
        const bidsSize = bids.length > 10 ? 10 : bids.length
        const asksSize = asks.length > 10 ? 10 : asks.length
        return <div className='orderbook'>
                <h1>Orderbook</h1>
                <table>
                    <thead>
                        <tr>
                            <th>MarketSize</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.slice(0, bidsSize).map((bid: Bid, idx: number) => {
                            return <tr className='green-text' key={idx}>
                                <td>{bid.specification.quantity.value} {bid.specification.quantity.currency}</td>
                                <td>{bid.specification.totalPrice.value} {bid.specification.totalPrice.currency}</td>
                            </tr>
                        })}
                        <tr>
                            <td>Spread</td>
                            <td>{'TBD'}</td>
                        </tr>
                        {asks.slice(0, asksSize).map((ask: Ask, idx: number) => {
                            return <tr className='red-text' key={idx}>
                                <td>{ask.specification.quantity.value} {ask.specification.quantity.currency}</td>
                                <td>{ask.specification.totalPrice.value} {ask.specification.totalPrice.currency}</td> 
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
    }
}

const mapStateToProps = (store: AppState) => {
    return {
        asks: store.orderbook.asks,
        bids: store.orderbook.bids
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

export default Orderbook