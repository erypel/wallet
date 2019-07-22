import React from 'react'
import { connect } from 'react-redux'
import { AppState, ws } from '../redux/store/WalletStore';
import Wallet from '../model/Wallet';
import { Table, Thead, Th, Tr, Tbody, Td } from './Table';
import GenerateWalletButton from './GenerateWalletButton';
import { LoginStore } from '../redux/store/LoginStore';

interface Props {
    store?: {
        wallets: Wallet[]
    }
}

const mapStateToProps = (state: AppState) => {
    return {wallets: state.wallets}
}

const ConnectedTable = (store: { wallets: Wallet[] }) => {
        
        if (!store || !store.wallets || store.wallets.length < 1){
            return <GenerateWalletButton/>
        }
        const { wallets } = store
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
                        <Td>{wallet.publicKey}</Td>
                        <Td>{wallet.privateKey}</Td>
                        <Td>{wallet.userId}</Td>
                    </Tr>)
                )}
                <Tr colSpan={4}><GenerateWalletButton/></Tr>
            </Tbody>
        </Table>
}

// class ConnectedTable extends React.PureComponent<Props> {
//     componentWillMount() {
//         ws.load(LoginStore.getState().user!!.id!!)
//     }

//     render() {
//         const { store } = this.props
        
//         if (!store || !store.wallets || store.wallets.length < 1){
//             return <GenerateWalletButton/>
//         }
//         const { wallets } = store
//         return <Table>
//             <Thead>
//                 <Tr>
//                     <Th>Public Key</Th>
//                     <Th>Private Key</Th>
//                     <Th>User ID</Th>
//                 </Tr>
//             </Thead>
//             <Tbody>
//                 {wallets.map(wallet => (<Tr>
//                         <Td>{wallet.publicKey}</Td>
//                         <Td>{wallet.privateKey}</Td>
//                         <Td>{wallet.userId}</Td>
//                     </Tr>)
//                 )}
//                 <Tr colSpan={4}><GenerateWalletButton/></Tr>
//             </Tbody>
//         </Table>
//     }
// }

const WalletTable = connect(mapStateToProps)(ConnectedTable)

export default WalletTable