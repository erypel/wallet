import Button from './Button'
import { connect } from 'react-redux'
import React from 'react'
import { ws } from '../redux/store/WalletStore'
import generateAddress from '../rippled/utils/generateAddress'
import { AppState } from '../redux/rootReducer';
import User from '../model/User';

interface Props {
    user?: User
}

class GenerateWalletButton extends React.PureComponent<Props> {
    render() {
        return <Button
            onClick={this.generate}
            buttonText='Generate Wallet'
        />
    }

    generate = () => {
        const pair = generateAddress()
        const { address, secret } = pair
        const activeUser = this.props.user
        const wallet = {
            publicKey: address as string,
            privateKey: secret as string,
            userId: activeUser!!.id!!
        }
        ws.create(wallet)
    }
}

const mapStateToProps = (store: AppState) => {
    return {
        login: store.login
    }
}

export default connect(mapStateToProps)(GenerateWalletButton)