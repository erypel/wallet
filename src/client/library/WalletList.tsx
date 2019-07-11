import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../redux/reducers/AddressReducer';

const mapStateToProps = (state: AppState) => {
    return {addresses: state.addresses}
}

const ConnectedList = (store: { addresses: string[]; }) => {
    const { addresses } = store
    return <ul>
        {addresses.map(address => <li key={address}>{address}</li>)}
    </ul>
}

const WalletList = connect(mapStateToProps)(ConnectedList)

export default WalletList