const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

export default async function unsubscribeFromBook(takerPays: string, takerGets: string, issuer: string = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'/**Gatehub USD*/) {
    return await api.connect().then(async () => { 

    return await api.request('unsubscribe', {
        books: [ 
            {taker_pays: {currency: takerPays}, taker_gets: {currency: takerGets, issuer: issuer}, snapshot: true, both: true},
            {taker_pays: {currency: takerGets, issuer: issuer}, taker_gets: {currency: takerPays}, snapshot: true, both: true}
         ]
    }).then(async (result: any) => {
        console.log('unsubscribed from books', result)
    }).catch((error: any) => {
        console.log(error)
    })
    })
}