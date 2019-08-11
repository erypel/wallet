import React from 'react'
import Wallet from '../model/Wallet'
import Balance from '../container/Balance'
import WalletPicker from '../container/WalletPicker'

interface Props {
    activeWallet?: Wallet
    baseCurrency: string
    quoteCurrency: string
}

class ExchangeWallet extends React.PureComponent<Props> {
    render() {
        const { activeWallet, baseCurrency, quoteCurrency } = this.props
        return <>
            <WalletPicker displayCurrency={baseCurrency} activeWallet={activeWallet}/>
            {activeWallet && <div className='content'>
                <div className='width-2-3'>
                    <Balance address={activeWallet.publicKey} currencies={[baseCurrency, quoteCurrency]}/>
                </div>
            </div>}
        </>
    }
}

export default ExchangeWallet