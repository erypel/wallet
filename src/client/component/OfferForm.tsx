import React from 'react'
import Tabs from '../container/Tabs'
import Input from '../library/Input'
import Switch from './Switch';


interface Props {
    bidCurrency: string
    askCurrency: string
}

interface State {
    amount: number
    limitPrice: number
    stopPrice: number
}

class OfferForm extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            amount: 0.00,
            limitPrice: 0.00,
            stopPrice: 0.00
        }
    }

    render() {
        const { amount, limitPrice, stopPrice } = this.state
        const { bidCurrency, askCurrency } = this.props
        return <form>
            <span>
                <div>BUY</div>
                <Switch id='buyOrSell' onValue='BUY' offValue='SELL'/>
                <p>SELL</p>
            </span>
            <Tabs>
                <div data-label='market'>
                    <label>
                        Amount
                        <Input id='amount' type='number' value={amount}/> {bidCurrency}
                    </label>
                </div>
                <div data-label='limit'>
                    <label>
                        Amount
                        <Input id='amount' type='number' value={amount}/> {askCurrency}
                    </label>
                    <br/>
                    <label>
                        Limit Price
                        <Input id='limitPrice' type='number' value={limitPrice}/> {bidCurrency}
                    </label>
                </div>
                <div data-label='stop'>
                    <label>
                        Stop Price
                        <Input id='amount' type='number' value={stopPrice}/> {bidCurrency}
                    </label>
                    <br/>
                    <label>
                        Amount
                        <Input id='amount' type='number' value={amount}/> {askCurrency}
                    </label>
                    <br/>
                    <label>
                        Limit Price
                        <Input id='limitPrice' type='number' value={limitPrice}/> {bidCurrency}
                    </label>
                </div>
            </Tabs>
        </form>
    }
}

export default OfferForm