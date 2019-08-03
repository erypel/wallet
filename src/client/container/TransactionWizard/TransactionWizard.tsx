import React from 'react'
import PrepareTransactionStep from './PrepareTransactionStep'
import SignTransactionStep from './SignTransactionStep'
import SubmitTransactionStep from './SubmitTransactionStep'
import VerifyTransactionStep from './VerifyTransactionStep'
import { Dispatch } from 'redux'
import { setSrcAddress, setSrcSecret } from '../../store/transaction/actions'
import { connect } from 'react-redux'
import { Steps } from '../../xrpl/api/model/Steps'

interface TransactionWizardProps {
    publicKey: string
    privateKey: string
    setPublicKey: (publicKey: string) => any
    setPrivateKey: (privateKey: string) => void
}

export type Step = Steps

interface TransactionWizardState {
    currentStep: Step
}

class TransactionWizard extends React.PureComponent<TransactionWizardProps, TransactionWizardState> {
    constructor(props: TransactionWizardProps) {
        super(props)
        this.props.setPublicKey(this.props.publicKey)
        this.props.setPrivateKey(this.props.privateKey)
        this.state = {
            currentStep: Steps.Prepare
        }
    }

    next = () => {
        var { currentStep } = this.state
        const { Prepare, Sign, Submit, Verify } = Steps
        if (currentStep === Prepare) {
            currentStep = Sign
            this.setState({
                currentStep: currentStep
            })
        } else if (currentStep === Sign) {
            currentStep = Submit
            this.setState({
                currentStep: currentStep
            })
        } else if (currentStep === Submit) {
            currentStep = Verify
            this.setState({
                currentStep: currentStep
            })
        }
    }

    render() {
        const { currentStep } = this.state
        const { Prepare, Sign, Submit, Verify } = Steps
        return <div>
                {currentStep === Prepare && <PrepareTransactionStep next={this.next}/>}
                {currentStep === Sign && <SignTransactionStep next={this.next}/>}
                {currentStep === Submit && <SubmitTransactionStep next={this.next}/>}
                {currentStep === Verify && <VerifyTransactionStep/>}
            </div>
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPublicKey: (publicKey: string) => dispatch(setSrcAddress(publicKey)),
        setPrivateKey: (privateKey: string) => dispatch(setSrcSecret(privateKey))
    }
}

export default connect(null, mapDispatchToProps)(TransactionWizard)