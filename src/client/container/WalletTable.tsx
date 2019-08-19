import React from 'react'
import { connect } from 'react-redux'
import GenerateWalletButton from './GenerateWalletButton'
import User from '../model/User'
import { AppState } from '../store/rootReducer'
import { WalletMap } from '../store/wallet/types'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import Subheader from '../component/Subheader'
import { history } from '../utils/history'
import { loadWallets } from '../store/wallet/actions'
import { walletService } from '../services/walletService'
import ImportWalletModal from '../component/ImportWalletModal';

const mapStateToProps = (store: AppState) => {
    return {
        wallets: store.wallet.wallets,
        user: store.user.user
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        load: (userId: string) => dispatch(loadWallets(userId))
    }
}

interface Props {
    wallets: WalletMap
    displayCurrency: string
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
        const { props, handleClick } = this
        const { wallets, displayCurrency } = props

        // for IE
        var justWallets = Array.from(Object.values(wallets))

        if ( !justWallets || justWallets.length < 1 ){
            return <div className='width-2-3'>
                <Subheader title='Accounts'/>
                <GenerateWalletButton className='button-green'/>
            </div>
        }

        return <div className='width-2-3'>
            <Subheader title='Accounts'/>
            {justWallets.map(wallet => {
                const { publicKey } = wallet
                var { balances } = wallet
                const balance = balances ? walletService.findBalance(displayCurrency, balances) : 'Could not fetch balances'
                return <table key={`wallet-table-${publicKey}`} className="wallet-table" onClick={() => handleClick(publicKey)}>
                    <tbody>
                        <tr key={publicKey}>
                            <td className="wallet-table-label">Account #:</td>
                            <td className="wallet-table-value">{publicKey}</td>
                        </tr>
                        <tr key={`${publicKey}${balance}`}>
                            <td className="wallet-table-label">Balance:</td>
                            <td className="wallet-table-value">{balance}</td>
                        </tr>
                    </tbody>
                </table>
            })}
            <GenerateWalletButton className='button-green'/>
            <ImportWalletModal/>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable)