import React from 'react'
import Button from './Button'
import { walletService } from '../services/walletService'
import { history } from '../utils/history'

interface Props {
    privateKey: string
}

export default class DeleteWalletButton extends React.PureComponent<Props> {
    render() {
        return <Button buttonText='Delete Wallet' className='button-red' onClick={this.delete}/>
    }

    delete = () => {
        walletService.delete(this.props.privateKey).then(() => {
            history.push('/home')
        })
    }
}