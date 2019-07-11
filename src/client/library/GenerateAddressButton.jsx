import Button from './Button'

import React from 'react'

class GenerateAddressButton extends React.Component {
    render() {
        return <Button
        onClick={this.generate}
        buttonText='Generate Address'
    />
    }

    generate = () => {
        alert('genereated')
    }
}

export default GenerateAddressButton