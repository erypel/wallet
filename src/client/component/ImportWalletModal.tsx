import React from 'react'
import Button from './Button'
import Modal from './Modal'
import ImportWalletForm from './ImportWalletForm'

interface Props {
    className?: string
}

interface State {
    isOpen: boolean
}

export default class ImportWalletModal extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    render() {
        const { toggleModal, state, props } = this
        const { className } = props
        const { isOpen } = state
        return <>
            <Button buttonText='Import Wallet' onClick={toggleModal} className={className}/>
            {isOpen && <Modal title='Import Wallet' onClose={toggleModal}>
                <ImportWalletForm afterSubmit={toggleModal}/>
            </Modal>}
        </>
    }

    toggleModal = () => {
        const { isOpen } = this.state
        this.setState({
            isOpen: !isOpen
        })
    }
}