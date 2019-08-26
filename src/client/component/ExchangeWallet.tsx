import React from 'react'
import Wallet from '../model/Wallet'
import Balance from '../container/Balance'
import WalletPicker from '../container/WalletPicker'

interface Props {
    activeWallet?: Wallet
    baseCurrency: string
    quoteCurrency: string
    className?: string
}

class ExchangeWallet extends React.PureComponent<Props> {
    render() {
        const { activeWallet, baseCurrency, quoteCurrency, className } = this.props
        return <div className={className}>
            <h1><WalletPicker displayCurrency={baseCurrency} activeWallet={activeWallet}/></h1>
            {activeWallet && <Balance address={activeWallet.publicKey} currencies={[baseCurrency, quoteCurrency]}/>}
        </div>
    }
}

export default ExchangeWallet