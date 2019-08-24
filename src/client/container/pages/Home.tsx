import React from 'react'
import WalletTable from '../WalletTable'
import GenerateWalletButton from '../GenerateWalletButton'
import ImportWalletModal from '../../component/ImportWalletModal'
import Subheader from '../../component/Subheader'

export default class Home extends React.PureComponent {
    
    render() {
        return <div className='width-2-3'>
                <Subheader title='Accounts'/>
                <WalletTable displayCurrency='XRP'/>
                <span>
                <GenerateWalletButton className='button-green width-1-2'/>
                <ImportWalletModal className='button-green width-1-2'/>
                </span>
                <br/>
            </div>
            
    }
}