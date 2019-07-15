import React from 'react'
import PrepareTransactionStep from './PrepareTransactionStep'
import SignTransactionStep from './SignTransactionStep'
import SubmitTransactionStep from './SubmitTransactionStep'
import VerifyTransactionStep from './VerifyTransactionStep'
import { Steps } from '../../rippled/model/Steps'
import { Provider } from 'react-redux';
import TransactionStore from '../../redux/store/TransactionStore';

interface TransactionWizardProps {

}

export type Step = Steps

interface TransactionWizardState {
    currentStep: Step
}

export default class TransactionWizard extends React.PureComponent<TransactionWizardProps, TransactionWizardState> {
    constructor(props: TransactionWizardProps) {
        super(props)
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
        return <Provider store={TransactionStore}>
            <div>
                {currentStep === Prepare && <PrepareTransactionStep next={this.next}/>}
                {currentStep === Sign && <SignTransactionStep next={this.next}/>}
                {currentStep === Submit && <SubmitTransactionStep next={this.next}/>}
                {currentStep === Verify && <VerifyTransactionStep/>}
            </div>
        </Provider>
    }
}