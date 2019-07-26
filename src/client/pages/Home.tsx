import React from 'react'
import { Provider } from 'react-redux'
import WalletTable from '../library/WalletTable'
import WalletStore from '../redux/store/WalletStore'
import LogOutButton from '../library/LogOutButton';

export default class Home extends React.PureComponent {
    
    render() {
        return (<Provider store={WalletStore}>
            <div>
                {/* <WalletTable/> */}
                <br/>
                <LogOutButton/>
            </div>
            </Provider>);
    }
}