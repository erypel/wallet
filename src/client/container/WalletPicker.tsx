import React from 'react'
import { connect } from 'react-redux'
import User from '../model/User'
import { AppState } from '../store/rootReducer'
import { WalletMap } from '../store/wallet/types'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { loadWallets, setActiveWallet } from '../store/wallet/actions'
import Menu from '../component/Menu'
import Wallet from '../model/Wallet'

const mapStateToProps = (store: AppState) => {
    const { wallet, user } = store
    const { wallets, activeWallet } = wallet
    return {
        wallets: wallets,
        activeWallet: activeWallet,
        user: user.user
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        load: (userId: string) => dispatch(loadWallets(userId)),
        setActive: (wallet: Wallet) => dispatch(setActiveWallet(wallet))
    }
}

interface Props {
    wallets: WalletMap
    activeWallet?: Wallet
    user?: User
    load: (userId: string) => Promise<any>
    setActive: (wallet: Wallet) => Promise<any>
}

class WalletPicker extends React.PureComponent<Props> {
    componentWillMount() {
        const { load, user } = this.props
        load(user!!.id!!)
    }

    handleClick(wallet: Wallet) {
        this.props.setActive(wallet)
    }

    render() {
        const { wallets, activeWallet } = this.props

        // for IE
        var justWallets = Array.from(Object.values(wallets))

        return <Menu title={activeWallet ? activeWallet.publicKey : 'Select a wallet'}>
            {justWallets.map(wallet => {
                const { publicKey } = wallet
                var { balance } = wallet
                if (!balance) {
                    balance = 'ERROR'
                }
                return <table className="wallet-table" onClick={() => this.handleClick(wallet)}>
                    <tbody>
                        <tr>
                            <td className="wallet-table-label">Account #:</td>
                            <td className="wallet-table-value">{publicKey}</td>
                        </tr>
                        <tr>
                            <td className="wallet-table-label">Balance:</td>
                            <td className="wallet-table-value">{balance}</td>
                        </tr>
                    </tbody>
                </table>
            })}
            </Menu>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletPicker)