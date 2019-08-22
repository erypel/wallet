import React from 'react'
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
        const { bids, asks, baseCurrency, quoteCurrency } = this.props
        const bidsSize = bids.length > 10 ? 10 : bids.length
        const asksSize = asks.length > 10 ? 10 : asks.length
        const hasSpread = asksSize !== 0 && bidsSize !== 0
        var bidSpread = 0
        var askSpread = 0
        if (hasSpread) {
            const lowestBid = bids[bidsSize -1]
            const lowestBidSpec = lowestBid.specification
            bidSpread = Number(lowestBidSpec.totalPrice.value) / Number(lowestBidSpec.quantity.value)
            const highestAsk = asks[0]
            const highestAskSpec = highestAsk.specification
            askSpread = Number(highestAskSpec.totalPrice.value) / Number(highestAskSpec.quantity.value)
        }
        return <div className='orderbook'>
                <h1>Orderbook</h1>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>MarketSize</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.slice(0, bidsSize).map((bid: Bid, idx: number) => {
                            return <tr className='green-text' key={idx}>
                                <td>{idx === 0 ? 'Offers to buy' : ''}</td>
                                <td>{bid.specification.quantity.value} {baseCurrency}</td>
                                <td>{bid.specification.totalPrice.value} {quoteCurrency}</td>
                            </tr>
                        })}
                        {hasSpread && <tr>
                            <td></td>
                            <td>Spread</td>
                            <td>{Math.abs(bidSpread - askSpread)} {quoteCurrency}</td>
                        </tr>}
                        {asks.slice(0, asksSize).map((ask: Ask, idx: number) => {
                            return <tr className='red-text' key={idx}>
                                <td>{idx === 0 ? 'Offers to sell' : ''}</td>
                                <td>{ask.specification.quantity.value} {baseCurrency}</td>
                                <td>{ask.specification.totalPrice.value} {quoteCurrency}</td> 
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
    }
}

export default Orderbook