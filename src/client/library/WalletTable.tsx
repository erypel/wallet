import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../redux/store/WalletStore';
import Wallet from '../model/Wallet';
import { Table, Thead, Th, Tr, Tbody, Td } from './Table';
import GenerateAddressButton from './GenerateAddressButton';

const mapStateToProps = (state: AppState) => {
    return {wallets: state.wallets}
}

const ConnectedList = (store: { wallets: Wallet[]; }) => {
    const { wallets } = store
    if (wallets.length < 1){
        return <GenerateAddressButton/>
    }

    return <Table>
        <Thead>
            <Tr>
                <Th>Wallet ID</Th>
                <Th>Public Key</Th>
                <Th>Private Key</Th>
                <Th>User ID</Th>
            </Tr>
        </Thead>
        <Tbody>
            {wallets.map(wallet => (<Tr>
                    <Td>{wallet.id}</Td>
                    <Td>{wallet.publicKey}</Td>
                    <Td>{wallet.privateKey}</Td>
                    <Td>{wallet.userId}</Td>
                </Tr>)
            )}
            <Tr colSpan={4}><GenerateAddressButton/></Tr>
        </Tbody>
    </Table>
}

const WalletTable = connect(mapStateToProps)(ConnectedList)

export default WalletTable