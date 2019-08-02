import React from 'react'
import Button from '../../component/Button'
import getOrderbook from '../../rippled/utils/getOrderbook';
import OrderbookBuilder from '../../rippled/model/transaction/Orderbook/OrderbookBuilder';

export default class Home extends React.PureComponent {
    
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
        return <div>
                <Button buttonText='Get Order Book' onClick={this.onClick}/>
            </div>
            
    }
}