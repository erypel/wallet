import React from 'react'
import { connect } from 'react-redux'
import Button from '../../library/Button'
import Modal from '../../library/Modal'
import TransactionWizard from '../TransactionWizard/TransactionWizard'
import LogOutButton from '../../library/LogOutButton'
import { Link } from 'react-router-dom'
import Balance from '../../library/Balance'
import { WalletMap } from '../../redux/store/wallet/types'
import Tabs from '../Tabs';

interface Props {
    match: any
    publicKey: string
    wallets: WalletMap
}

class Wallet extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props)
    }
    
    render() {
        const { publicKey } = this.props.match.params
        const privateKey = this.props.wallets[publicKey].privateKey
        if(!privateKey) {
            return <div>ERROR</div>
        }
        return <div>
                <Balance address={publicKey}/>
                <Tabs>
                    <div data-label="Send">
                        <TransactionWizard publicKey={publicKey} privateKey={privateKey}/>
                    </div>
                    <div data-label="Receive">
                        <p>Send XRP here: {publicKey}</p>
                    </div>
                </Tabs>
                <br/>
                <Link to='/home'>Back to list</Link>
                <br/>
                <LogOutButton/>
            </div>
    }
}

const mapStateToProps = (store: any) => {
    return {
        wallets: store.wallet.wallets
    }
}

export default connect(mapStateToProps)(Wallet)