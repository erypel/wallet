import React from 'react'
import Bid from '../xrpl/api/model/transaction/Orderbook/Bid'
import Ask from '../xrpl/api/model/transaction/Orderbook/Ask'
import { IssuerCurrency } from '../xrpl/api/utils/issuers'

interface Props {
    baseCurrency: IssuerCurrency,
    quoteCurrency: IssuerCurrency,
    bids: Bid[]
    asks: Ask[]
}

class Orderbook extends React.PureComponent<Props> {
    render() {
        const { bids, asks, baseCurrency, quoteCurrency } = this.props
        const bidsSize = bids.length > 10 ? 10 : bids.length
        const asksSize = asks.length > 10 ? 10 : asks.length
        const hasSpread = asksSize !== 0 && bidsSize !== 0
        const spread = hasSpread ? this.calculateSpread(bidsSize, bids, asks) : 0
        return <div className='orderbook'>
                <h1>Orderbook</h1>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Market Size</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.slice(0, bidsSize).map((bid: Bid, idx: number) => {
                            const { quantity, totalPrice } = bid.specification
                            const { value: quantityValue } = quantity
                            const { value: priceValue } = totalPrice
                            return <tr className='green-text' key={idx}>
                                <td>{idx === 0 ? 'Offers to buy' : ''}</td>
                                <td>{quantityValue} {baseCurrency}</td>
                                <td>{Number(priceValue) / Number(quantityValue)} {quoteCurrency}</td>
                                <td>{priceValue} {quoteCurrency}</td>
                            </tr>
                        })}
                        {hasSpread && <tr>
                            <td></td>
                            <td>Spread</td>
                            <td></td>
                            <td>{spread} {quoteCurrency}</td>
                        </tr>}
                        {asks.slice(0, asksSize).map((ask: Ask, idx: number) => {
                            const { quantity, totalPrice } = ask.specification
                            const { value: quantityValue } = quantity
                            const { value: priceValue } = totalPrice
                            return <tr className='red-text' key={idx}>
                                <td>{idx === 0 ? 'Offers to sell' : ''}</td>
                                <td>{quantityValue} {baseCurrency}</td>
                                <td>{Number(priceValue) / Number(quantityValue)} {quoteCurrency}</td>
                                <td>{priceValue} {quoteCurrency}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
    }

    calculateSpread = (bidsSize: number, bids: Bid[], asks: Ask[]): number => {
        const lowestBid = bids[bidsSize -1]
        const lowestBidSpec = lowestBid.specification
        const bidSpread = Number(lowestBidSpec.totalPrice.value) / Number(lowestBidSpec.quantity.value)
        const highestAsk = asks[0]
        const highestAskSpec = highestAsk.specification
        const askSpread = Number(highestAskSpec.totalPrice.value) / Number(highestAskSpec.quantity.value)
        return Math.abs(bidSpread - askSpread)
    }
}

export default Orderbook