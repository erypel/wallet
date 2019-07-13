import React from 'react'
import Dropdown from './Dropdown';
import CurrencyStore from '../redux/store/currency'
import Payment from '../rippled/model/transaction/Payment';
import Currency from '../rippled/model/Currency';
import Amount from '../rippled/model/Amount';
import Source from '../rippled/model/Source';
import Destination from '../rippled/model/Destination';
import { TransactionBuilder } from '../rippled/model/transaction/TransactionBuilder';

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

interface SendFormProps {
    srcAddress: string
    srcSecret: string
}

interface SendFormState {
    destAddress: string
    amount: string
}

type FormFields = keyof SendFormState

class SendForm extends React.PureComponent<SendFormProps, SendFormState> {
    constructor(props: SendFormProps) {
        super(props)
        this.state = {
            destAddress: '',
            amount: ''
        }
    }

    public static defaultProps = {
        // These are for development and testing
        srcAddress: 'rBpMw6fUSV6TnxeAK1wEhuj854ZiTasjtS',
        srcSecret: 'sp1C74ibduMAXbBRN6LnXXgguNTDa'
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget

        this.setState({
            [id]: value
        } as Pick<SendFormState, FormFields>)
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { state, props } = this
        const {amount, destAddress} = state
        const { srcAddress } = props
        alert(`Sending ${amount} to ${destAddress} from ${srcAddress}`)
        const currency = new Currency("XRP", "$")
        const amt = new Amount(currency, amount)
        const source = new Source(srcAddress, undefined, amt)
        const destination = new Destination(destAddress, amt)
        const builder = new TransactionBuilder(source, destination)
        const payment = new Payment(builder)
        console.log(payment)
        payment.send()
    }

    render() {
        const currencies = CurrencyStore.currencies
        const { handleChange, state, handleSubmit } = this
        const { destAddress, amount} = state
        return <form onSubmit={handleSubmit}>
            {/* TODO address fields should be their own component with special validation */}
            <label>
                Address:
                <input type="text" id="destAddress" value={destAddress} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Amount:
                <input type="number" id="amount" value={amount} onChange={handleChange}/>
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