import React from 'react'
import { Table, Td, Tbody, Tr, Thead } from '../component/Table'
import getBalances from '../xrpl/api/utils/getBalances'
import { Balance as Balances } from '../xrpl/api/model/Balance'

type BalanceMap = { [key:string]: string } //currency to value

interface Props {
    address: string
    currencies?: string[]
}

interface State {
    balances: BalanceMap
}

class Balance extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            balances: {}
        }
    }

    setBalance = () => {
        getBalances(this.props.address).then((balances: Balances[]) => {
            const balanceMap: BalanceMap = {}
            for(let i=0; i < balances.length; i++){
                const balance = balances[i]
                const { currency, value } = balance
                balanceMap[currency] = value
            }
            this.setState({balances: balanceMap})
        })
    }

    mapBalances = () => {
        const { props, state } = this
        const { currencies } = props
        const { balances } = state
        if (!currencies) {
            return <Tr key='error' colSpan={2}>ERROR</Tr>
        }
        return currencies.map(currency => {
            const balance = balances[currency]
            return <Tr key={`${currency}-${balance}`}>
                <Td>{currency}</Td>
                <Td>{balance ? balance : 0}</Td>
            </Tr>
        })
    }

    componentDidMount() {
        this.setBalance()
    }

    componentDidUpdate() {
        this.setBalance()
    }

    render() {
        const { props, state } = this
        const { balances } = state
        const { currencies } = props
        if(balances === {}) {
            return <label>Fetching Balance...</label>
        }
        if (currencies) {
            return <Table className='container-black'>
                <Thead>
                    <Tr key='header'>
                        <Td>Asset</Td>
                        <Td>Balance</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {this.mapBalances()}
                </Tbody>
            </Table>
        } else {
            return <Table className='container-black'>
                <Tbody>
                    <Tr>
                        <Td>Balance</Td>
                        <Td>{balances['XRP']} XRP</Td>
                    </Tr>
                </Tbody>
            </Table>
        }
    }
}

export default Balance