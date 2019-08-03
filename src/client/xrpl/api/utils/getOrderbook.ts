import Orderbook, { AsksAndBids } from '../model/transaction/Orderbook/Orderbook'
import toJsonObject from '../../../utils/toJsonObject'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})



export default async function getOrderbook(address: string, orderbook: Orderbook): Promise<AsksAndBids> {
    const options = orderbook.options
    const optionsJson = options ? toJsonObject(options) : {}
    const orderbookJson = toJsonObject({base: orderbook.base, counter: orderbook.counter})
    try {
        return await api.connect().then(async() => {
            const book = await api.getOrderbook(address, orderbookJson, optionsJson)
            console.log(book)
            return book
        })
    } catch(error) {
        console.log(error)
        return {
            asks: [],
            bids: []
        }
    }
} 