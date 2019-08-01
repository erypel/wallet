import React from 'react'
import { connect } from 'react-redux'
import TransactionWizard from '../TransactionWizard/TransactionWizard'
import { Link } from 'react-router-dom'
import Balance from '../Balance'
import { WalletMap } from '../../store/wallet/types'
import Tabs from '../Tabs';
import Subheader from '../../component/Subheader'

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
        return <>
        <Subheader title='Send and Receive'/>
        <div className='content'>
            <div className='width-2-3'>
                <Balance address={publicKey}/>
                <br/>
                <Tabs>
                    <div data-label="Send">
                        <TransactionWizard publicKey={publicKey} privateKey={privateKey}/>
                    </div>
                    <div data-label="Receive">
                        <div className='container-white'>Send XRP here: {publicKey}</div>
                    </div>
                </Tabs>
                <br/>
                <Link to='/home'>Back to list</Link>
                <br/>
            </div>
        </div>
        </>
    }
}

const mapStateToProps = (store: any) => {
    return {
        wallets: store.wallet.wallets
    }
}

export default connect(mapStateToProps)(Wallet)