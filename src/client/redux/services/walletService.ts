import Wallet from '../../model/Wallet'
import { WalletMap } from '../store/wallet/types'

async function create(wallet: Wallet): Promise<Wallet | undefined> {
    return await fetch('http://localhost:7000/wallet/create', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(wallet)
    }).then(async response => {
        const json = await response.json()
        console.log(json)
        return json
    }).catch(error => {
        alert(error)
    })
}

async function loadList(userId: string): Promise<WalletMap> {
    return await fetch(`http://localhost:7000/wallet/${userId}`, {
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

export const walletService = {
    create,
    loadList
}