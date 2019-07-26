import React from 'react'
import WalletTable from '../library/WalletTable'
import LogOutButton from '../library/LogOutButton'

export default class Home extends React.PureComponent {
    
    render() {
        return <div>
                <WalletTable/>
                <br/>
                <LogOutButton/>
            </div>
            
    }
}