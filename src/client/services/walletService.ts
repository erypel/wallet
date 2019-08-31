import Wallet from '../model/Wallet'
import { WalletMap } from '../store/wallet/types'
import { Balance } from '../xrpl/api/model/Balance'

async function create(wallet: Wallet): Promise<Wallet | undefined> {
    return await fetch('http://localhost:7000/wallet/create', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
            userId: wallet.userId
        })
    }).then(async response => {
        const json = await response.json()
        console.log(json)
        return json
    }).catch(error => {
        alert(error)
    })
}

async function loadList(userId: string): Promise<WalletMap> {
    return await fetch(`http://localhost:7000/wallet/user/${userId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'GET'
    }).then(async response => {
        const json = await response.json()
        console.log(json)
        return json
    }).catch(error => {
        alert(error)
    })
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
    return await fetch(`http://localhost:7000/wallet/${privateKey}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'DELETE'
    }).then(async response => {
        const json = await response.json()
        console.log(json)
        return json
    }).catch(error => {
        alert(error)
    })
}

export const walletService = {
    create,
    loadList,
    findBalance,
    delete: deleteWallet
}