import { issuers } from './issuers';

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function unsubscribeFromBook(takerPays: string, takerGets: string) {
    if(takerPays === 'XRP' || takerGets === 'XRP') {
        return await doUnsubscribe(takerGets, takerPays)
    } else {
        return Promise.all(
            [
                doUnsubscribe(takerGets, 'XRP'),
                doUnsubscribe('XRP', takerPays)
            ]
        ).then(([res1, res2]) => {
            return [res1, res2]
        }) 
    }
}

async function doUnsubscribe(takerPays: string, takerGets: string) {
    const takerGetsIssuer = issuers[takerGets][0]
    const takerPaysIssuer = issuers[takerPays][0] //TODO
    return await api.connect().then(async () => { 
        return await api.request('unsubscribe', {
            books: [ 
                {taker_pays: {currency: takerPays, issuer: takerPaysIssuer}, taker_gets: {currency: takerGets, issuer: takerGetsIssuer}, snapshot: true, both: true},
                {taker_pays: {currency: takerGets, issuer: takerGetsIssuer}, taker_gets: {currency: takerPays, issuer: takerPaysIssuer}, snapshot: true, both: true}
            ]
        }).then(async (result: any) => {
            console.log('unsubscribed from books', result)
        }).catch((error: any) => {
            console.log(error)
        })
    })
}