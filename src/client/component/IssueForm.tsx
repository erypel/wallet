import React from 'react'
import XrpInput from './XrpInput'
import Input from './Input'
import Wallet from '../model/Wallet'
import { getAccountInfo } from '../xrpl/api/utils/account/accountInfo';
import { getAccountCurrencies } from '../xrpl/api/utils/account/accountCurrencies';
import { getAccountLines } from '../xrpl/api/utils/account/accountLines';
import { getAccountObjects } from '../xrpl/api/utils/account/accountObjects';
import { getAccountOffers } from '../xrpl/api/utils/account/accountOffers';
import { getAccountTx } from '../xrpl/api/utils/account/accountTx';
import { getGatewayBalances } from '../xrpl/api/utils/account/gatewayBalances';
import { norippleCheck } from '../xrpl/api/utils/account/norippleCheck';
import { getAccountChannels } from '../xrpl/api/utils/account/accountChannels';

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

    submitIssueForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation() 
        const { activeWallet } = this.props
         if (!activeWallet) {
             alert('Please select a wallet.')
         } else {
             const { publicKey } = activeWallet
             //testing
             const test1 = await getAccountInfo(publicKey)
             const test2 = await getAccountChannels(publicKey)
             const test3 = await getAccountCurrencies(publicKey)
             const test4 = await getAccountLines(publicKey)
             const test5 = await getAccountObjects(publicKey)
             const test6 = await getAccountOffers(publicKey)
             const test7 = await getAccountTx(publicKey)
             const test8 = await getGatewayBalances(publicKey)
             const test9 = await norippleCheck(publicKey, 'user')
         
            console.log('account info', test1)
            console.log('account channels', test2)
            console.log('account currencies', test3)
            console.log('account lines', test4)
            console.log('account objects', test5)
            console.log('account offers', test6)
            console.log('account tx', test7)
            console.log('gateway balances', test8)
            console.log('noripple check', test9)
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget
        this.setState({
            [id]: value as any
        } as Pick<State, FormFields>)
    }
    
    render() {
        const { state, handleChange, submitIssueForm } = this
        const { numberOfIssuingTokens, issuingSymbol, xrpValue } = state
        return <form onSubmit={submitIssueForm}>
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