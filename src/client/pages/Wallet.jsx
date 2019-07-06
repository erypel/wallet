import React from 'react'
import Button from '../library/Button'
import Modal from '../library/Modal'
import Dropdown from '../library/Dropdown'
import SendForm from '../library/SendForm'
import CurrencyState from '../store/currency'

export default class Wallet extends React.PureComponent {
    constructor() {
        super();

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
                        <SendForm/>
                </Modal>}
                <Button buttonText='Receive'/>
            </div>);
    }
}