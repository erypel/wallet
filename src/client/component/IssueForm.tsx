import React from 'react'
import XrpInput from './XrpInput'
import Input from './Input'
import Wallet from '../model/Wallet'
import { issueService } from '../services/issueService'

interface Props {
    activeWallet?: Wallet
}

interface State {
    numberOfIssuingTokens: number
    issuingSymbol: string
    xrpValue: number
}

type FormFields = keyof State

export default class IssueForm extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            numberOfIssuingTokens: 0.00,
            issuingSymbol: '',
            xrpValue: 0.00
        }
    }

    submitIssuance = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation() 
        const { props, state } = this
        const { activeWallet } = props
        const { issuingSymbol, numberOfIssuingTokens } = state
         if (!activeWallet) {
             alert('Please select a wallet.')
         } else {
             const issuance = {
                 currency: issuingSymbol,
                 value: numberOfIssuingTokens.toString(),
                 issuer: activeWallet.publicKey
             }
             const testWallet = {
                 privateKey: 'shPv1eXaHJ3hpbbEbFWTxKTujAkDK',
                 publicKey: 'rGcVnVr5ZZaZ59jnk5VmXsHgGgG8XUaMRQ',
                 userId: '1'
             }
             issueService.issue(activeWallet, testWallet, issuance)
             this.clearForm()
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget
        this.setState({
            [id]: value as any
        } as Pick<State, FormFields>)
    }

    clearForm = () => {
        this.setState({
            numberOfIssuingTokens: 0.00,
            issuingSymbol: '',
            xrpValue: 0.00
        })
    }
    
    render() {
        const { state, handleChange, submitIssuance } = this
        const { numberOfIssuingTokens, issuingSymbol, xrpValue } = state
        return <form onSubmit={submitIssuance}>
            <XrpInput id='numberOfIssuingTokens' value={numberOfIssuingTokens} onChange={handleChange}/>
            <Input id='issuingSymbol' value={issuingSymbol} type='text' maxLength={3} onChange={handleChange}/>
            <p>@</p>
            <XrpInput id='xrpValue' value={xrpValue} onChange={handleChange}/>
            <Input id='xrpSymbol' value='XRP' type='text'/>
            <br/>
            <Input id='submit' value='Issue' type='submit'/>
        </form>
    }
}