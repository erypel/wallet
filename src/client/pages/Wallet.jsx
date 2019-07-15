import React from 'react'
import Button from '../library/Button'
import Modal from '../library/Modal'
import Dropdown from '../library/Dropdown'
import GenerateAddressButton from '../library/GenerateAddressButton'
import WalletList from '../library/WalletList'
import CurrencyState from '../redux/store/currency'
import TransactionWizard from '../library/TransactionWizard/TransactionWizard';

export default class Wallet extends React.PureComponent {
    constructor() {
        super()

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
        return (<div>
                <GenerateAddressButton/>
                <br/>
                <WalletList/>
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
            </div>);
    }
}