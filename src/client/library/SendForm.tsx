import React from 'react'
import Dropdown from './Dropdown';
import CurrencyStore from '../redux/store/currency'

/**
	 * Your Credentials
	Address
	rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS
	Secret
	sp1C74ibduMAXbBRN6LnXXgguNTDa
	Balance
	10,000 XRP
	 */

	/**
	 * public: rwYQjHp9HZiKKpZB4i4fvc8eQvAtA7vdY6
	 * secret: snKixQChzs9KcBxxrYWpm97sxnA1e
	 */

//TODO these files should be .tsx
interface SendFormProps {

}

interface SendFormState {
    address: string
    amount: string
}

type FormFields = keyof SendFormState

class SendForm extends React.PureComponent<SendFormProps, SendFormState> {
    constructor(props: SendFormProps) {
        super(props)
        this.state = {
            address: '',
            amount: ''
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget

        this.setState({
            [id]: value
        } as Pick<SendFormState, FormFields>)
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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