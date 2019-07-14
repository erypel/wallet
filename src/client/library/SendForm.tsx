import React from 'react'
import Dropdown from './Dropdown';
import CurrencyStore from '../redux/store/currency'
import Input from './Input';
import { isValidAddress } from '../rippled/utils/isValidAddress';

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
    handleSubmit: (srcAddress: string, destAddress: string, amount: string) => void
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

    onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { state, props } = this
        const { destAddress, amount } = state
        const { srcAddress, handleSubmit } = props
        handleSubmit(srcAddress, destAddress, amount)
    }

    render() {
        const currencies = CurrencyStore.currencies
        const { handleChange, onSubmit, state } = this
        const { destAddress, amount} = state
        return <form onSubmit={onSubmit}>
            {/* TODO address fields should be their own component with special validation */}
            <label>
                Address:
                <Input type="text" id="destAddress" value={destAddress} onChange={handleChange}/>
            </label>
            <br/>
            <label>
                Amount:
                <Input type="number" id="amount" value={amount} onChange={handleChange}/>
            </label>
            <Dropdown
                title="Select currency"
                list={currencies}
            />
            <br/>
            {isValidAddress(destAddress) &&  amount && <Input type="submit" value="Send" id="sendXrp"/>}
        </form>
    }
}

export default SendForm