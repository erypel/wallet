import React from 'react'
import { Provider } from 'react-redux'
import Button from '../library/Button'
import Modal from '../library/Modal'
import Dropdown from '../library/Dropdown'
import CurrencyState from '../redux/store/currency'
import TransactionWizard from '../library/TransactionWizard/TransactionWizard';
import WalletStore from '../redux/store/WalletStore'
import LogOutButton from '../library/LogOutButton';
import { Link } from 'react-router-dom';

interface State {
    isSendModalOpen: boolean
    isReceiveModalOpen: boolean
}

interface Props {
    match: any;
    publicKey: string
    privateKey: string
}

export default class Wallet extends React.PureComponent<Props, State> {
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
        const currencies = CurrencyState.currencies
        const { publicKey, privateKey } = this.props.match.params
        return (<Provider store={WalletStore}>
            <div>
                <label>Balance <Dropdown
                    title="Select currency"
                    list={currencies}
                /></label>
                <label>Value<Dropdown
                    title="Select currency"
                    list={currencies}
                /></label>
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
            </Provider>);
    }
}