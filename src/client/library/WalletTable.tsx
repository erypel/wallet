import React from 'react'
import { connect } from 'react-redux'
import { AppState, ws } from '../redux/store/WalletStore';
import Wallet from '../model/Wallet';
import { Table, Thead, Th, Tr, Tbody, Td } from './Table';
import GenerateWalletButton from './GenerateWalletButton';
import { LoginStore } from '../redux/store/LoginStore';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const mapStateToProps = (state: AppState) => {
    return {wallets: state.wallets}
}

interface Props {
    wallets: Wallet[] 
}

class ConnectedTable extends React.PureComponent<Props> {
    componentWillMount() {
        ws.load(LoginStore.getState().user!!.id!!)
    }

    render() {
        const { wallets } = this.props
        
        if ( !wallets ||wallets.length < 1){
            return <GenerateWalletButton/>
        }
        return <Table>
            <Thead>
                <Tr>
                    <Th>Public Key</Th>
                    <Th>Private Key</Th>
                    <Th>User ID</Th>
                </Tr>
            </Thead>
            <Tbody>
                {wallets.map(wallet => (<Tr>
                <Td><Link to={`/wallet/${wallet.publicKey}/${wallet.privateKey}`}>{wallet.publicKey}</Link></Td>
                        <Td>{wallet.privateKey}</Td>
                        <Td>{wallet.userId}</Td>
                    </Tr>
                    )
                )}
                <Tr colSpan={4}><GenerateWalletButton/></Tr>
            </Tbody>
        </Table>
    }
}

const WalletTable = connect(mapStateToProps)(ConnectedTable)

export default WalletTable