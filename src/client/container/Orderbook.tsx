import React from 'react'
import Button from '../component/Button'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '../store/rootReducer'
import { fetchOrderbook } from '../store/orderbook/actions'
import { connect } from 'react-redux'
import Bid from '../xrpl/api/model/transaction/Orderbook/Bid'
import Ask from '../xrpl/api/model/transaction/Orderbook/Ask'
import { rippledStream } from '../xrpl/rippled/methods/stream'
import subscribe from '../xrpl/api/utils/subscribe';

interface Props {
    baseCurrency: string,
    quoteCurrency: string,
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
        //TODO maker sure there is a subscription to the orderbook
        props.loadOrderbook('', 'XRP', '', 'USD', '')
    }

    componentWillMount() {
        this.props.loadOrderbook('', 'XRP', '', 'USD', '')
    }

    onClick = () => {
        rippledStream.subscribeToBook('XRP', 'USD').then(book => {
            console.log('lookit', book)
        })
        subscribe('XRP', 'USD')
    }

    render() {
        const { bids, asks } = this.props
        const bidsSize = bids.length > 100 ? 100 : bids.length
        const asksSize = asks.length > 100 ? 100 : asks.length
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