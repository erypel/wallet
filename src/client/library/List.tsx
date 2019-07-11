import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state: { addresses: any; }) => {
    console.log("addresses" + state.addresses[0])
    return { addresses: state.addresses }
}

const ConnectedList = (addresses: string[]) => <ul>
    <li key={addresses[0]}>
        {addresses[0]}
    </li>
</ul>
const List = connect(mapStateToProps)(ConnectedList)

export default List