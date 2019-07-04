import React from 'react'
import Button from '../library/Button'
import Modal from '../library/Modal'
import Dropdown from '../library/Dropdown'

export default class Wallet extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            isSendModalOpen: false
        }
    }

    currencies = [
        {
            id: 0,
            title: 'XRP',
            selected: false,
            key: 'currency'
        },
        {
          id: 1,
          title: 'USD',
          selected: false,
          key: 'currency'
        }
      ];

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
        return (<div>
                <label>Balance <Dropdown
                    title="Select currency"
                    list={this.currencies}
                /></label>
                <label>Value<Dropdown
                    title="Select currency"
                    list={this.currencies}
                /></label>
                <Button onClick={this.openModal} buttonText='Send'/>
                {this.state.isSendModalOpen && <Modal
                    className="modal"
                    title="Send"
                    onClose={this.closeModal}>
                        Send some XRP
                </Modal>}
                <Button buttonText='Receive'/>
            </div>);
    }
}