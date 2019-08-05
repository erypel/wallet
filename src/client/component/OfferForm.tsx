import React from 'react'
import Tabs from '../container/Tabs'
import Input from '../library/Input'
import Switch from './Switch'


interface Props {
    bidCurrency: string
    askCurrency: string
}

interface State {
    isBuy: boolean
    amount: number
    limitPrice: number
    stopPrice: number
    showAdvanced: boolean
    timeInForce: string
    isPostOnly: boolean
}

type FormFields = keyof State

class OfferForm extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isBuy: false,
            amount: 0.00,
            limitPrice: 0.00,
            stopPrice: 0.00,
            showAdvanced: false,
            timeInForce: 'Good Til Cancelled',
            isPostOnly: false
        }
    }

    toggleAdvanced = () => {
        this.setState({
            showAdvanced: !this.state.showAdvanced
        })
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget

        this.setState({
            [id]: value as any
        } as Pick<State, FormFields>)
    }

    handleAdvanced = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { checked } = currentTarget

        if (!checked) {
            this.setState({
                timeInForce: 'Good Til Cancelled',
                isPostOnly: false,
                showAdvanced: checked
            })
        } else {
            this.setState({
                showAdvanced: checked
            })
        }
    }

    handleSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { currentTarget } = event
        const { value } = currentTarget

        this.setState({
            timeInForce: value
        })
    }

    onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { state, props } = this
        const { isBuy, amount, limitPrice, stopPrice, showAdvanced, timeInForce, isPostOnly } = state
        console.log('here')
    }

    clearOfferTabState = () => {
        this.setState({
            amount: 0.00,
            limitPrice: 0.00,
            stopPrice: 0.00,
            showAdvanced: false,
            timeInForce: 'Good Til Cancelled',
            isPostOnly: false
        })
    }

    render() {
        const { state, props, handleChange } = this
        const { amount, limitPrice, stopPrice, showAdvanced } = state
        const { bidCurrency, askCurrency } = props
        return <form onSubmit={this.onSubmit}>
            <span>
                <div>BUY</div>
                <Switch id='isBuy' onValue='BUY' offValue='SELL' onChange={handleChange}/>
                <p>SELL</p>
            </span>
            <Tabs onTabSwitch={this.clearOfferTabState}>
                <div data-label='market'>
                    <label>
                        Amount
                        <Input id='amount' type='number' value={amount} onChange={handleChange}/> {bidCurrency}
                    </label>
                </div>
                <div data-label='limit'>
                    <label>
                        Amount
                        <Input id='amount' type='number' value={amount} onChange={handleChange}/> {askCurrency}
                    </label>
                    <br/>
                    <label>
                        Limit Price
                        <Input id='limitPrice' type='number' value={limitPrice} onChange={handleChange}/> {bidCurrency}
                    </label>
                    <br/>
                    <label>
                        Advanced
                        <Input id='showAdvanced' type='checkbox' value={showAdvanced} onChange={this.handleAdvanced}/>
                    </label>
                    {showAdvanced && <div>
                        <label>
                            Time in force Policy
                            <select onChange={this.handleSelector}>
                                <option value='Good Til Cancelled'>Good Til Cancelled</option>
                                <option value='Good Til Time'>Good Til Time</option>
                                <option value='Immediate or Cancel'>Immediate or Cancel</option>
                                <option value='Fill or Kill'>Fill or Kill</option>
                            </select>
                        </label>
                        <br/>
                        <label>
                            Execution
                            <div>Post Only</div>
                            <Switch id='isPostOnly' onChange={handleChange}/>
                            <div>AllowTaker</div>
                        </label>
                    </div>
                    }
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
            <Input id='submit' type='submit' value='Submit Order'/>
        </form>
    }
}

export default OfferForm