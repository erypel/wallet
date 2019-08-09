import React from 'react'
import OfferForm from '../../component/OfferForm'
import Orderbook from '../Orderbook'
import WalletPicker from '../WalletPicker';

class Trade extends React.PureComponent {
    render() {
        return <div>
            <WalletPicker/>
            <OfferForm account='rNsjHCBJWAa8JWTTCA2EEd5uREDTeyZiDM' secret='sn8rAKRa16eo7YT8HmkKF9pQgKZbv' baseCurrency='XRP' quoteCurrency='USD'/>
            <Orderbook baseCurrency='XRP' quoteCurrency='USD'/>
        </div>
    }
}

export default Trade