import React from 'react'
import Button from '../../component/Button'
import getOrderbook from '../../rippled/utils/getOrderbook'
import OrderbookBuilder from '../../rippled/model/transaction/Orderbook/OrderbookBuilder'
import Bid from '../../rippled/model/transaction/Orderbook/Bid'
import Ask from '../../rippled/model/transaction/Orderbook/Ask'

interface State {
    bids: Bid[]
    asks: Ask[]
}

export default class Home extends React.PureComponent<{}, State> {
    
    onClick = () => {
        const orderbook = new OrderbookBuilder({
            currency: 'USD',
            counterparty: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'
        }, {
            currency: 'BTC',
            counterparty: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'
        }).build()
        getOrderbook('r9cZA1mLK5R5Am25ArfXFmqgNwjZgnfk59', orderbook)
    }

    render() {
        return <div className='orderbook'>
                <h1>Orderbook</h1>
                <table>
                    <thead>
                        <th>MarketSize</th>
                        <th>Price</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1.43</td>
                            <td>.54</td>
                        </tr>
                        <tr>
                            <td>Spread</td>
                            <td>0.01</td>
                        </tr>
                        <tr>
                            <td>43</td>
                            <td>.53</td>
                        </tr>
                    </tbody>
                </table>
                <Button buttonText='Get Order Book' onClick={this.onClick}/>
            </div>
            
    }
}