import React from 'react'
import Input from './Input'
import { connect } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../store/rootReducer'
import Wallet from '../model/Wallet'
import { create } from '../store/wallet/actions'
import User from '../model/User'
import { isValidAddress } from '../xrpl/api/utils/isValidAddress'
import { isValidSecret } from '../xrpl/api/utils/isValidSecret'

interface Props {
    createWallet: (wallet: Wallet, userId: string) => Promise<any>
    user: User
    afterSubmit?: () => void
}

interface State {
    publicKey: string
    privateKey: string
}

type FormFields = keyof State

class ImportWalletForm extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            publicKey: '',
            privateKey: ''
        }
    }

    render() {
        const { state, handleChange } = this
        const { publicKey, privateKey } = state
        return <form>
            <Input id='publicKey' value={publicKey} type='text' placeHolder='Public Key' onChange={handleChange}/>
            <Input id='privateKey' value={privateKey} type='text' placeHolder='Private Key' onChange={handleChange}/>
            {isValidAddress(publicKey) && isValidSecret(privateKey)
                && <Input id='submit' value='Import' type='submit'/>}
        </form>
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget
        this.setState({
            [id]: value as any
        } as Pick<State, FormFields>)
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const { props, state } = this
        const { publicKey, privateKey } = state
        if (isValidAddress(publicKey) && isValidSecret(privateKey)) {
            const { user, createWallet, afterSubmit } = props
            const userId = user!!.id!!
            const wallet = {
                publicKey: publicKey,
                privateKey: privateKey,
                userId: userId
            }
            createWallet(wallet, userId)
            afterSubmit && afterSubmit()
        } else {
            alert('Either public key or private key is invalid.')
        }
    }
}

const mapStateToProps = (store: AppState) => {
    return {
        user: store.login.user
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        createWallet: (wallet: Wallet, userId: string) => dispatch(create(wallet, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportWalletForm)