import React from 'react'
import { Table, Td, Tbody, Tr } from './Table';
import getBalances from '../rippled/utils/getBalances';

interface Props {
    address: string
}

interface State {
    xrpBalance: string
}

class Balance extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            xrpBalance: '0'
        }
    }

    componentDidMount() {
        getBalances(this.props.address).then((balances) => {
            try {
                this.setState({xrpBalance: balances[0].value})
            } catch (error) {
                this.setState({xrpBalance: "ERROR"})
            }
        })
    }

    render() {
        const {xrpBalance} = this.state
        if(!xrpBalance) {
            return <label>Fetching Balance...</label>
        }
        return <Table>
            <Tbody>
                <Tr>
                    <Td>Balance</Td>
                    <Td>{xrpBalance} XRP</Td>
                </Tr>
            </Tbody>
        </Table>
    }
}

export default Balance