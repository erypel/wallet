import React from 'react'
import Button from '../../component/Button'
import bookOffers from '../../rippled/model/transaction/NotUsing/BookOffer/bookOffers'

export default class Home extends React.PureComponent {
    
    onClick = () => {
        bookOffers('rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B', 'XRP', 'USD')
    }

    render() {
        return <div>
                <Button buttonText='Get Order Book' onClick={this.onClick}/>
            </div>
            
    }
}