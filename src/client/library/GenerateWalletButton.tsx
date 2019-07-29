import Button from '../component/Button'
import { connect } from 'react-redux'
import React from 'react'
import generateAddress from '../rippled/utils/generateAddress'
import { AppState } from '../redux/rootReducer';
import User from '../model/User';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import Wallet from '../model/Wallet';
import { create } from '../redux/store/wallet/actions';

interface Props {
    user?: User
    className?: string
    create: (wallet: Wallet, userId: string) => Promise<any>
}

class GenerateWalletButton extends React.PureComponent<Props> {
    render() {
        return <Button
            onClick={this.generate}
            buttonText='Generate Wallet'
            className={this.props.className}
        />
    }

    generate = () => {
        const pair = generateAddress()
        const { address, secret } = pair
        const { user, create } = this.props
        const userId = user!!.id!!
        const wallet = {
            publicKey: address as string,
            privateKey: secret as string,
            userId: userId
        }
        create(wallet, userId)
    }
}

const mapStateToProps = (store: AppState) => {
    return {
        user: store.login.user
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        create: (wallet: Wallet, userId: string) => dispatch(create(wallet, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateWalletButton)