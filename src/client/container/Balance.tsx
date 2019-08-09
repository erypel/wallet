import React from 'react'
import { Table, Td, Tbody, Tr } from '../library/Table'
import getBalances from '../xrpl/api/utils/getBalances'

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

    setBalance = () => {
        getBalances(this.props.address).then((balances) => {
            try {
                this.setState({xrpBalance: balances[0].value})
            } catch (error) {
                this.setState({xrpBalance: "ERROR"})
            }
        })
    }

    componentDidMount() {
        this.setBalance()
    }

    componentDidUpdate() {
        this.setBalance()
    }

    render() {
        const {xrpBalance} = this.state
        if(!xrpBalance) {
            return <label>Fetching Balance...</label>
        }
        return <Table className='container-black'>
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