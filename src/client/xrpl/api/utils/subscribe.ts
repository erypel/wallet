import formatBidsAndAsks from './formatBidsAndAsks'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

const account = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq' // Replace with the account you want notifications for

export default async function subscribe(takerPays: string, takerGets: string, issuer: string = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq'/**Gatehub USD*/) {
    api.connect().then(async () => { // Omit this if you are already connected

    // 'transaction' can be replaced with the relevant `type` from the table above
    api.connection.on('transaction', (event: any) => {

        // Do something useful with `event`
        console.log(JSON.stringify(event, null, 2))
    })

    return await api.request('subscribe', {
        books: [ 
            {taker_pays: {currency: takerPays}, taker_gets: {currency: takerGets, issuer: issuer}, snapshot: true, both: true},
            {taker_pays: {currency: takerGets, issuer: issuer}, taker_gets: {currency: takerPays}, snapshot: true, both: true}
         ]
    }).then(async (result: any) => {
        //result is bids and asks object
        console.log("tada", result)
    }).catch((error: any) => {
        // Handle `error`
        console.log(error)
    })
    })
}
  