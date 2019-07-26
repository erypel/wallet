import React from 'react'
import { connect } from 'react-redux'
import Button from '../library/Button'
import Modal from '../library/Modal'
import TransactionWizard from '../library/TransactionWizard/TransactionWizard'
import LogOutButton from '../library/LogOutButton'
import { Link } from 'react-router-dom'
import Balance from '../library/Balance'
import { WalletMap } from '../redux/store/wallet/types'

interface State {
    isSendModalOpen: boolean
    isReceiveModalOpen: boolean
}

interface Props {
    match: any
    publicKey: string
    wallets: WalletMap
}

class Wallet extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        
        this.state = {
            isSendModalOpen: false,
            isReceiveModalOpen: false
        }
    }

    openSendModal = () => {
        this.setState({
            isSendModalOpen: true,
            isReceiveModalOpen: false
        });
    }

    closeSendModal = () => {
        this.setState({
            isSendModalOpen: false
        });
    }

    openReceiveModal = () => {
        this.setState({
            isReceiveModalOpen: true,
            isSendModalOpen: false
        });
    }

    closeReceiveModal = () => {
        this.setState({
            isReceiveModalOpen: false
        });
    }
    
    render() {
        const { publicKey } = this.props.match.params
        const privateKey = this.props.wallets[publicKey].privateKey
        if(!privateKey) {
            return <div>ERROR</div>
        }
        return <div>
                <Balance address={publicKey}/>
                
                <Button onClick={this.openSendModal} buttonText='Send'/>
                {this.state.isSendModalOpen && <Modal
                    className="modal"
                    title="Send"
                    onClose={this.closeSendModal}>
                        <TransactionWizard publicKey={publicKey} privateKey={privateKey}/>
                </Modal>}
                <Button onClick={this.openReceiveModal} buttonText='Receive'/>
                {this.state.isReceiveModalOpen && <Modal
                    className="modal"
                    title="Receive"
                    onClose={this.closeReceiveModal}>
                        <p>Send XRP here: {publicKey}</p>
                </Modal>}
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