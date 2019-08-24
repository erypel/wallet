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
        return <div>
            <WalletPicker displayCurrency={baseCurrency} activeWallet={activeWallet}/>
            {activeWallet && <Balance address={activeWallet.publicKey} currencies={[baseCurrency, quoteCurrency]}/>}
        </div>
    }
}

export default ExchangeWallet