import React from 'react'
import XrpInput from './XrpInput'
import Input from './Input'

interface Props {

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

    onSubmit = () => {

    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget
        this.setState({
            [id]: value as any
        } as Pick<State, FormFields>)
    }
    
    render() {
        const { state, handleChange, onSubmit } = this
        const { numberOfIssuingTokens, issuingSymbol, xrpValue } = state
        return <form onSubmit={onSubmit}>
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