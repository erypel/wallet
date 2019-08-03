import React from 'react'
import Button from '../../component/Button'
import getOrderbook from '../../rippled/utils/getOrderbook'
import OrderbookBuilder from '../../rippled/model/transaction/Orderbook/OrderbookBuilder'
import Bid from '../../rippled/model/transaction/Orderbook/Bid'
import Ask from '../../rippled/model/transaction/Orderbook/Ask'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '../../store/rootReducer'
import { fetchOrderbook } from '../../store/orderbook/actions'
import { connect } from 'react-redux'

interface Props {
    bids: Bid[]
    asks: Ask[]
    loadOrderbook: (
        address: string, 
        baseCurrency: string, 
        baseCounterparty: string, 
        counterCurrency: string,
        counterCounterparty: string
    ) => void
}

class Orderbook extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props)
        //TODO refresh every second or so
        props.loadOrderbook('', 'XRP', '', 'XRP', '')
    }


    onClick = () => {
        const orderbook = new OrderbookBuilder({
            currency: 'USD',
            counterparty: 'rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL'
        }, {
            currency: 'XRP',
            counterparty: 'rchGBxcD1A1C2tdxF6papQYZ8kjRKMYcL'
        }).setLimit(10).build()
        getOrderbook('r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59', orderbook)
    }

    render() {
        // const { bids, asks } = this.props
        const bids = [
            {marketSize: 1,price: 2},{marketSize: 2,price: 2},{marketSize: 3,price: 2},{marketSize: 4,price: 2},{marketSize: 5,price: 2},{marketSize: 6,price: 2},{marketSize: 7,price: 2},{marketSize: 8,price: 2},{marketSize: 9,price: 2},{marketSize: 10,price: 2},{marketSize: 11,price: 2}

        ]
        const asks = [
            {marketSize: 1,price: 2},{marketSize: 2,price: 2},{marketSize: 3,price: 2},{marketSize: 4,price: 2},{marketSize: 5,price: 2},{marketSize: 6,price: 2},{marketSize: 7,price: 2},{marketSize: 8,price: 2},{marketSize: 9,price: 2},{marketSize: 10,price: 2},{marketSize: 11,price: 2}
        ]
        const bidsSize = bids.length > 10 ? 10 : bids.length
        const asksSize = asks.length > 10 ? 10 : asks.length
        return <div className='orderbook'>
                <h1>Orderbook</h1>
                <table>
                    <thead>
                        <th>MarketSize</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        {bids.slice(0, bidsSize).map(bid => {
                            return <tr className='green-text'>
                                {/* <td>{bid.specificaton.quantity.value}</td>
                                <td>{bid.specificaton.totalPrice.value}</td> */} 
                                <td>{bid.marketSize}</td>
                                <td>{bid.price}</td>
                            </tr>
                        })}
                        <tr>
                            <td>Spread</td>
                            <td>{'TBD'}</td>
                        </tr>
                        {asks.slice(0, asksSize).map(ask => {
                            return <tr className='red-text'>
                                {/* <td>{ask.specificaton.quantity.value}</td>
                                <td>{ask.specificaton.totalPrice.value}</td>  */}
                                <td>{ask.marketSize}</td>
                                <td>{ask.price}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <Button buttonText='Get Order Book' onClick={this.onClick}/>
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
            address: string, 
            baseCurrency: string, 
            baseCounterparty: string, 
            counterCurrency: string,
            counterCounterparty: string
        ) => dispatch(
            fetchOrderbook(
                address, 
                baseCurrency, 
                baseCounterparty, 
                counterCurrency, 
                counterCounterparty
            )
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orderbook)