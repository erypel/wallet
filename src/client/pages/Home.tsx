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

export default class Home extends React.PureComponent {
    
    render() {
        return (<Provider store={WalletStore}>
            <div>
                <WalletTable/>
                <br/>
                <LogOutButton/>
            </div>
            </Provider>);
    }
}