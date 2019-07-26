import React from 'react'
import { connect } from 'react-redux'
import { WalletStoreState, ws, WalletMap } from '../redux/store/WalletStore'
import { Table, Thead, Th, Tr, Tbody, Td } from './Table'
import GenerateWalletButton from './GenerateWalletButton'
import { Link } from 'react-router-dom'
import User from '../model/User';
import { AppState } from '../redux/rootReducer';

const mapStateToProps = (store: AppState) => {
    return {
        //wallets: store.wallets,
        login: store.login
    }
}

interface Props {
    wallets: WalletMap
    user?: User
}

class ConnectedTable extends React.PureComponent<Props> {
    componentWillMount() {
        ws.load(this.props.user!!.id!!)
    }

    render() {
        const { wallets } = this.props

        // for IE
        var justWallets = Array.from(Object.values(wallets))

        if ( !justWallets || justWallets.length < 1 ){
            return <GenerateWalletButton/>
        }

        return <>
        <Table>
            <Thead>
                <Tr>
                    <Th>Public Key</Th>
                    <Th>Private Key</Th>
                    <Th>User ID</Th>
                </Tr>
            </Thead>
            <Tbody>
                {justWallets.map(wallet => (<Tr key={wallet.publicKey}>
                <Td><Link to={`/wallet/${wallet.publicKey}`}>{wallet.publicKey}</Link></Td>
                        <Td>{wallet.privateKey}</Td>
                        <Td>{wallet.userId}</Td>
                    </Tr>
                    )
                )}
            </Tbody>
        </Table>
        <GenerateWalletButton/>
        </>
    }
}

const WalletTable = connect(mapStateToProps)(ConnectedTable)

export default WalletTable