import React from 'react'
import OfferForm from '../../component/OfferForm'
import Orderbook from '../Orderbook'

class Trade extends React.PureComponent {
    render() {
        return <div>
            <OfferForm account='rNsjHCBJWAa8JWTTCA2EEd5uREDTeyZiDM' secret='sn8rAKRa16eo7YT8HmkKF9pQgKZbv' bidCurrency='USD' askCurrency='XRP'/>
            <Orderbook />
        </div>
    }
}

export default Trade