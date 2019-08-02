import React from 'react'
import { connect } from 'react-redux'
import GenerateWalletButton from '../library/GenerateWalletButton'
import User from '../model/User'
import { AppState } from '../store/rootReducer'
import { WalletMap } from '../store/wallet/types'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { load } from '../store/wallet/actions'
import Subheader from '../component/Subheader'
import { history } from '../utils/history'

const mapStateToProps = (store: AppState) => {
    return {
        wallets: store.wallet.wallets,
        user: store.user.user
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        load: (userId: string) => dispatch(load(userId))
    }
}

interface Props {
    wallets: WalletMap
    user?: User
    load: (userId: string) => Promise<any>
}

class WalletTable extends React.PureComponent<Props> {
    componentWillMount() {
        const { load, user } = this.props
        load(user!!.id!!)
    }

    handleClick(publicKey: string) {
        history.push(`/wallet/${publicKey}`)
    }

    render() {
        const { wallets } = this.props

        // for IE
        var justWallets = Array.from(Object.values(wallets))

        if ( !justWallets || justWallets.length < 1 ){
            return <div className='width-2-3'>
                <Subheader title='Accounts'/>
                <GenerateWalletButton className='button-green'/
            ></div>
        }

        return <div className='width-2-3'>
            <Subheader title='Accounts'/>
            {justWallets.map(wallet => {
                const { publicKey } = wallet
                var { balance } = wallet
                if (!balance) {
                    balance = 'ERROR'
                }
                return <table className="wallet-table" onClick={() => this.handleClick(publicKey)}>
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
            <GenerateWalletButton className='button-green'/>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable)