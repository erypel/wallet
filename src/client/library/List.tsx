import React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../redux/reducers/AddressReducer';

const mapStateToProps = (state: AppState) => {
    return {address: state.addresses}
}

const ConnectedList = (addresses: { address: string[]; }) => {

return <ul>
    <li>
        {addresses.address[0]}
    </li>
</ul>}
const List = connect(mapStateToProps)(ConnectedList)

export default List