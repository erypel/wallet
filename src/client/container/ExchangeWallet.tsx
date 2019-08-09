import React from 'react'
import { connect } from 'react-redux'
import Wallet from '../model/Wallet'
import Balance from './Balance'
import WalletPicker from './WalletPicker'

interface Props {
    activeWallet?: Wallet
}

class ExchangeWallet extends React.PureComponent<Props> {
    render() {
        const { activeWallet } = this.props
        return <>
            <WalletPicker activeWallet={activeWallet}/>
            {activeWallet && <div className='content'>
                <div className='width-2-3'>
                    <Balance address={activeWallet.publicKey}/>
                </div>
            </div>}
        </>
    }
}

export default ExchangeWallet