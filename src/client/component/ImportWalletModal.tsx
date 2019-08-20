import React from 'react'
import Button from './Button'
import Modal from './Modal'
import ImportWalletForm from './ImportWalletForm'

interface State {
    isOpen: boolean
}

export default class ImportWalletModal extends React.PureComponent<{}, State> {
    constructor({}) {
        super({})
        this.state = {
            isOpen: false
        }
    }

    render() {
        const { toggleModal, state } = this
        const { isOpen } = state
        return <div>
            <Button buttonText='Import Wallet' onClick={toggleModal}/>
            {isOpen && <Modal title='Import Wallet' onClose={toggleModal}>
                <ImportWalletForm afterSubmit={toggleModal}/>
            </Modal>}
        </div>
    }

    toggleModal = () => {
        const { isOpen } = this.state
        this.setState({
            isOpen: !isOpen
        })
    }
}