import Wallet from '../model/Wallet'
import { WalletMap } from '../store/wallet/types'
import { Balance } from '../xrpl/api/model/Balance'
import { http } from './httpService'

async function create(wallet: Wallet): Promise<Wallet | undefined> {
    return await http.post(
        'http://localhost:7000/wallet/create', 
        JSON.stringify({
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
            userId: wallet.userId
        })
    )
}

async function loadList(userId: string): Promise<WalletMap> {
    return await http.get(`http://localhost:7000/wallet/user/${userId}`)
}

function findBalance(matchCurrency: string, balances: Balance[]): string {
    var totalValue = 0
    for(let i = 0; i < balances.length; i++) {
        const balance = balances[i]
        const { currency, value } = balance
        if (currency === matchCurrency) {
            totalValue += Number(value)
        }
    }
    return totalValue.toString()
}

async function deleteWallet(privateKey: string) {
    return await http.delete(`http://localhost:7000/wallet/${privateKey}`)
}

export const walletService = {
    create,
    loadList,
    findBalance,
    delete: deleteWallet
}