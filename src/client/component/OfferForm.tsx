import React from 'react'
import Tabs from '../container/Tabs'
import Input from './Input'
import Switch from './Switch'
import { offerService } from '../services/offerService'
import Amount from '../xrpl/api/model/Amount'
import Currency from '../xrpl/api/model/Currency'


interface Props {
    baseCurrency: string
    quoteCurrency: string
    account: string
    secret: string
}

interface State {
    isSell: boolean
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
            isSell: false,
            amount: 0.00,
            limitPrice: 0.00,
            stopPrice: 0.00,
            showAdvanced: false,
            timeInForce: 'Good Til Cancelled',
            isPostOnly: false
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget
        this.setState({
            [id]: value as any
        } as Pick<State, FormFields>)
    }

    handleCheckbox = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { checked, id } = currentTarget
        this.setState({
            [id]: checked as any
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
        const { account, secret, baseCurrency, quoteCurrency } = props
        const { isSell, amount, limitPrice, stopPrice, showAdvanced, timeInForce, isPostOnly } = state
        const offerAmount = (limitPrice > 0) ? new Amount(baseCurrency, amount.toString(), 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq') 
            : (isSell) ? new Amount(baseCurrency, amount.toString()) : new Amount(quoteCurrency, amount.toString())
        const limit = new Amount(quoteCurrency, limitPrice.toString(), 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq')
        const offer = await offerService.buildCreateOffer(
            account, 
            isSell, 
            offerAmount, 
            limit, 
            stopPrice, 
            showAdvanced, 
            timeInForce, 
            isPostOnly,
            baseCurrency,
            quoteCurrency
        )
        offerService.sendOffer(offer, secret)
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
        const { state, props, handleChange, handleCheckbox } = this
        const { amount, limitPrice, stopPrice, showAdvanced } = state
        const { isSell, timeInForce } = state
        const isGoodTilTime = timeInForce === 'Good Til Time'
        const { baseCurrency, quoteCurrency } = props
        return <div>
            <h3>{baseCurrency}-{quoteCurrency}</h3>
            <form onSubmit={this.onSubmit}>
                <span>
                    <div>BUY</div>
                    <Switch id='isSell' onChange={handleCheckbox}/>
                    <p>SELL</p>
                </span>
                <Tabs onTabSwitch={this.clearOfferTabState}>
                    <div data-label='market'>
                        <label>
                            Amount
                            <Input id='amount' type='number' value={amount} onChange={handleChange}/> {isSell ? baseCurrency : quoteCurrency}
                        </label>
                    </div>
                    <div data-label='limit'>
                        <label>
                            Amount
                            <Input id='amount' type='number' value={amount} onChange={handleChange}/> {baseCurrency}
                        </label>
                        <br/>
                        <label>
                            Limit Price
                            <Input id='limitPrice' type='number' value={limitPrice} onChange={handleChange}/> {quoteCurrency}
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
                                {isGoodTilTime && <p>Good Til: Tomorrow</p>}
                            </label>
                            <br/>
                            <label>
                                Execution
                                <div>Post Only</div>
                                <Switch id='isPostOnly' onChange={handleCheckbox}/>
                                <div>AllowTaker</div>
                            </label>
                        </div>
                        }
                    </div>
                    {/* 
                    
                    Leaving this unimplemented for now since it will probably require creating an order
                    book listener serverside to execute trades as they become available. Client side 
                    support is good enough for the DEX
                    
                    <div data-label='stop'>
                        <label>
                            Stop Price
                            <Input id='amount' type='number' value={stopPrice}/> {baseCurrency}
                        </label>
                        <br/>
                        <label>
                            Amount
                            <Input id='amount' type='number' value={amount}/> {quoteCurrency}
                        </label>
                        <br/>
                        <label>
                            Limit Price
                            <Input id='limitPrice' type='number' value={limitPrice}/> {baseCurrency}
                        </label>
                    </div> */}
                </Tabs>
                <Input id='submit' type='submit' value='Submit Order'/>
            </form>
        </div>
    }
}

export default OfferForm