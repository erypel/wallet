import Balance from '../xrpl/api/model/Balance'

export default interface Wallet {
    publicKey: string
    privateKey: string
    userId: string
    balances?: Balance[]
}