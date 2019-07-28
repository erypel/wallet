import React from 'react'
import { connect } from 'react-redux'
import { Table, Thead, Th, Tr, Tbody, Td } from './Table'
import GenerateWalletButton from './GenerateWalletButton'
import { Link } from 'react-router-dom'
import User from '../model/User'
import { AppState } from '../redux/rootReducer'
import { WalletMap } from '../redux/store/wallet/types'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { load } from '../redux/store/wallet/actions';

const mapStateToProps = (store: AppState) => {
    return {
        wallets: store.wallet.wallets,
        user: store.user.user
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        load: (userId: string) => dispatch(load(userId))
    }
}

interface Props {
    wallets: WalletMap
    user?: User
    load: (userId: string) => Promise<any>
}

class WalletTable extends React.PureComponent<Props> {
    componentWillMount() {
        const { load, user } = this.props
        load(user!!.id!!)
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable)