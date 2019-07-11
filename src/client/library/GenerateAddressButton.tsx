import Button from './Button'
import { connect } from 'react-redux'
import React from 'react'
import { addAddress } from '../redux/actions/AddressActions';
import AddressStore from '../redux/store/AddressStore';
import generateAddress from '../rippled/utils/generateAddress';

class GenerateAddressButton extends React.Component {
    render() {
        return <Button
        onClick={this.generate}
        buttonText='Generate Address'
    />
    }

    generate = () => {
        const pair = generateAddress()
        const { address } = pair
        AddressStore.dispatch(addAddress(address))
    }
}

export default connect()(GenerateAddressButton)