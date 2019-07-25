import React from 'react'
import { connect } from 'react-redux'
import { WalletStoreState, ws, WalletMap } from '../redux/store/WalletStore'
import { Table, Thead, Th, Tr, Tbody, Td } from './Table'
import GenerateWalletButton from './GenerateWalletButton'
import { LoginStore } from '../redux/store/LoginStore'
import { Link } from 'react-router-dom'

const mapStateToProps = (state: WalletStoreState) => {
    return {wallets: state.wallets}
}

interface Props {
    wallets: WalletMap
}

class ConnectedTable extends React.PureComponent<Props> {
    componentWillMount() {
        ws.load(LoginStore.getState().user!!.id!!)
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