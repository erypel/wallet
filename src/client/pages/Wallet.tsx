import React from 'react'
import { Provider } from 'react-redux'
import Button from '../library/Button'
import Modal from '../library/Modal'
import Dropdown from '../library/Dropdown'
import WalletTable from '../library/WalletTable'
import CurrencyState from '../redux/store/currency'
import TransactionWizard from '../library/TransactionWizard/TransactionWizard';
import WalletStore from '../redux/store/WalletStore'
import LogOutButton from '../library/LogOutButton';

interface State {
    isSendModalOpen: boolean
    isReceiveModalOpen: boolean
}

export default class Wallet extends React.PureComponent<{}, State> {
    constructor(props = {}) {
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
        return (<Provider store={WalletStore}>
            <div>
                <WalletTable/>
                <br/>
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
                        <TransactionWizard/>
                </Modal>}
                <Button onClick={this.openReceiveModal} buttonText='Receive'/>
                {this.state.isReceiveModalOpen && <Modal
                    className="modal"
                    title="Receive"
                    onClose={this.closeReceiveModal}>
                        <p>Send XRP here: {}</p>
                </Modal>}
                <br/>
                <LogOutButton/>
            </div>
            </Provider>);
    }
}