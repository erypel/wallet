import React from 'react'
import Wallet from '../model/Wallet'
import Balance from './Balance'
import WalletPicker from './WalletPicker'

interface Props {
    activeWallet?: Wallet
    displayCurrency: string
}

class ExchangeWallet extends React.PureComponent<Props> {
    render() {
        const { activeWallet, displayCurrency } = this.props
        return <>
            <WalletPicker displayCurrency={displayCurrency} activeWallet={activeWallet}/>
            {activeWallet && <div className='content'>
                <div className='width-2-3'>
                    <Balance address={activeWallet.publicKey}/>
                </div>
            </div>}
        </>
    }
}

export default ExchangeWallet