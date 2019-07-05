import React from 'react'
import Dropdown from './Dropdown';
import CurrencyStore from '../store/currency'

//TODO these files should be .tsx
class SendForm extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            amount: ''
        }
    }

    handleChange = (event) => {
        const {target} = event
        const {value , id} = target

        this.setState({
            [id]: value
        })
    }

    handleSubmit = (event) => {
        alert(`Sending ${this.state.amount} to ${this.state.address}`)
        event.preventDefault()
    }

    render() {
        const currencies = CurrencyStore.currencies
        return <form onSubmit={this.handleSubmit}>
            {/* TODO address fields should be their own component with special validation */}
            <label>
                Address:
                <input type="text" id="address" value={this.state.address} onChange={this.handleChange}/>
            </label>
            <br/>
            <label>
                Amount:
                <input type="number" id="amount" value={this.state.amount} onChange={this.handleChange}/>
            </label>
            <Dropdown
                title="Select currency"
                list={currencies}
            />
            <br/>
            <input type="submit" value="Send"/>
        </form>
    }
}

export default SendForm