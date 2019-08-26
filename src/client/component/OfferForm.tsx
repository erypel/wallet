import React from 'react'
import Tabs from '../container/Tabs'
import Input from './Input'
import Switch from './Switch'
import { offerService } from '../services/offerService'
import Amount from '../xrpl/api/model/Amount'
import { fetchOpenOrders } from '../store/orderbook/actions'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import UsdInput from './UsdInput'
import XrpInput from './XrpInput'
import { issuers, IssuerCurrency } from '../xrpl/api/utils/issuers'
import { transactionService } from '../services/transactionService'


interface Props {
    baseCurrency: IssuerCurrency
    quoteCurrency: IssuerCurrency
    account: string
    secret: string
    getOpenOrders: (address: string) => void
    className?: string
}

interface State {
    isSell: boolean
    amount: string
    limitPrice: string
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
            amount: '',
            limitPrice: '',
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
        event.stopPropagation()
        const { state, props, clearForm } = this
        const { account, secret, baseCurrency, quoteCurrency, getOpenOrders } = props
        const { isSell, amount, limitPrice, showAdvanced, timeInForce, isPostOnly } = state
        const offerAmount = (Number(limitPrice) > 0) ? new Amount(baseCurrency, amount.toString(), issuers[baseCurrency][0]) 
            : (isSell) ? new Amount(baseCurrency, amount.toString()) : new Amount(quoteCurrency, amount.toString())
        const limit = new Amount(quoteCurrency, limitPrice.toString(), issuers[quoteCurrency][0])
        try {
            const offer = await offerService.buildCreateOffer(
                account, 
                isSell, 
                offerAmount, 
                limit, 
                showAdvanced, 
                timeInForce, 
                isPostOnly,
                baseCurrency,
                quoteCurrency
            )
        
            transactionService.send(offer, secret).then(() => {
                getOpenOrders(account)
                clearForm()
            })
        } catch(error) {
            alert(error)
        }
    }

    clearForm = () => {
        this.clearOfferTabState()
    }

    clearOfferTabState = () => {
        this.setState({
            amount: '',
            limitPrice: '',
            showAdvanced: false,
            timeInForce: 'Good Til Cancelled',
            isPostOnly: false
        })
    }

    render() {
        const { state, props, handleChange, handleCheckbox } = this
        const { amount, limitPrice, showAdvanced } = state
        const { isSell, timeInForce } = state
        const isGoodTilTime = timeInForce === 'Good Til Time'
        const { baseCurrency, quoteCurrency, className } = props
        const marketCurrency = isSell ? baseCurrency : quoteCurrency
        return <div className={className}>
            <form onSubmit={this.onSubmit} className=''>
                <br/>
                <Switch id='isSell' onChange={handleCheckbox} onLabel='BUY' offLabel='SELL' isOn={true}/>
                <br/>
                <br/>
                <Tabs onTabSwitch={this.clearOfferTabState}>
                    <div data-label='market'>
                        <label>
                            Amount
                            {marketCurrency === 'USD' ? 
                                <UsdInput id='amount' value={amount} onChange={handleChange} placeHolder={0.00}/> :
                                <XrpInput id='amount' value={amount} onChange={handleChange} placeHolder={0.000000}/>} {marketCurrency}
                        </label>
                    </div>
                    <div data-label='limit'>
                        <label>
                            Amount
                            {baseCurrency === 'USD' ? 
                                <UsdInput id='amount' value={amount} onChange={handleChange} placeHolder={0.00}/> :
                                <XrpInput id='amount' value={amount} onChange={handleChange} placeHolder={0.000000}/>} {baseCurrency}
                        </label>
                        <br/>
                        <label>
                            Limit Price
                            {quoteCurrency === 'USD' ? 
                                <UsdInput id='limitPrice' value={limitPrice} onChange={handleChange} placeHolder={0.00}/> :
                                <XrpInput id='limitPrice' value={limitPrice} onChange={handleChange} placeHolder={0.000000}/>} {quoteCurrency}
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
                            <br/>
                            <Switch id='isPostOnly' onChange={handleCheckbox} onLabel={'Post Only'} offLabel={'Allow Taker'}/>
                        </div>
                        }
                    </div>
                </Tabs>
                <br/>
                <Input id='submit' type='submit' value='Submit Order' className='button-green'/>
            </form>
        </div>
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getOpenOrders: (address: string) => dispatch(fetchOpenOrders(address))
    }
}

export default connect(null, mapDispatchToProps)(OfferForm)