import Button from './Button'
import { connect } from 'react-redux'
import React from 'react'
import { addAddress } from '../redux/actions/AddressActions';

class GenerateAddressButton extends React.Component {
    render() {
        return <Button
        onClick={this.generate}
        buttonText='Generate Address'
    />
    }

    generate = () => {
        alert('genereated')
        addAddress("abc")
    }
}

export default connect()(GenerateAddressButton)