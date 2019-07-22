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
}

export default class Wallet extends React.PureComponent<{}, State> {
    constructor(props = {}) {
        super(props)

        this.state = {
            isSendModalOpen: false
        }
    }

      openModal = () => {
        this.setState({
            isSendModalOpen: true
        });
    }

    closeModal = () => {
        this.setState({
            isSendModalOpen: false
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
                <Button onClick={this.openModal} buttonText='Send'/>
                {this.state.isSendModalOpen && <Modal
                    className="modal"
                    title="Send"
                    onClose={this.closeModal}>
                        <TransactionWizard/>
                </Modal>}
                <Button buttonText='Receive'/>
                <br/>
                <LogOutButton/>
            </div>
            </Provider>);
    }
}