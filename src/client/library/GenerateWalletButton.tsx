import Button from './Button'
import { connect } from 'react-redux'
import React from 'react'
import WalletStore, { addWallet } from '../redux/store/WalletStore'
import generateAddress from '../rippled/utils/generateAddress'
import { LoginStore } from '../redux/store/LoginStore';

class GenerateWalletButton extends React.PureComponent {
    render() {
        return <Button
        onClick={this.generate}
        buttonText='Generate Wallet'
    />
    }

    generate = () => {
        const pair = generateAddress()
        const { address, secret } = pair
        const activeUser = LoginStore.getState().user
        const wallet = {
            publicKey: address as string,
            privateKey: secret as string,
            userId: "3"//activeUser!!.id!!
        }
        WalletStore.dispatch(addWallet(wallet))
    }
}

export default connect()(GenerateWalletButton)