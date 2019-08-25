import React from 'react'
import { Table, Thead, Th, Tbody, Tr, Td } from './Table'
import { AccountTransaction } from '../xrpl/api/model/account/AccountTransactions'
import { currencyService } from '../services/currencyService'
import rippleTimeToIso8601 from '../xrpl/api/utils/rippleTimeToIso8601'
import Payment from '../xrpl/api/model/transaction/Payment/Payment'
import '../css/Table.css'
import '../main.css'

interface Props {
    transactions: AccountTransaction[]
    isLoading: boolean
    account: string
}

export default class TransactionTable extends React.PureComponent<Props> {
    render() {
        const { transactions, isLoading } = this.props
        console.log('isloading', isLoading)
        console.log('tx', transactions)
        if (isLoading) {
            return <div>
                <h1>Transactions</h1>
                <div>Loading...</div>
            </div>
        }
        return <>
            <h1>Transactions</h1>
            <Table className='container-black'>
                <Thead>
                    <Tr>
                        <Th>Transaction Type</Th>
                        <Th>Amount</Th>
                        <Th>Account</Th>
                        <Th>Date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {this.mapTransactions()}
                </Tbody>
            </Table>
        </>
    }

    mapTransactions = () => {
        const { transactions } = this.props
        if (transactions.length === 0) {
            return <Tr>
                <Td colSpan={4}>No Transactions</Td>
            </Tr>
        }
        return transactions.map((transaction: AccountTransaction, idx: number) => {
            const { tx } = transaction
            if (!tx) { return null }
            const { TransactionType: type } = tx
            //only showing payments for now
            if (type === 'Payment') {
                return this.mapPayment(tx as Payment, idx)
            } else {
                return null
            }
        })
    }

    mapPayment = (payment: Payment, idx: number) => {
        const { Amount: amount, Destination: dest, date, Account: source } = payment
        const { account } = this.props
        const isReceived = account === dest
        return <Tr key={idx}>
            <Td>{isReceived ? 'Received' : 'Sent' }</Td>
            <Td>{currencyService.createCurrencyString(amount)}</Td>
            <Td>{isReceived ? source : dest }</Td>
            <Td>{rippleTimeToIso8601(date!!).toDateString()}</Td>
        </Tr>
    }
}