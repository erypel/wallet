import Button from './Button'
import { connect } from 'react-redux'
import React from 'react'
import AddressStore, { addAddress } from '../redux/store/AddressStore'
import generateAddress from '../rippled/utils/generateAddress'

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