import Orderbook from '../model/transaction/Orderbook/Orderbook'
import toJsonObject from '../../utils/toJsonObject'
import Ask from '../model/transaction/Orderbook/Ask'
import Bid from '../model/transaction/Orderbook/Bid'

const RippleAPI = require('ripple-lib').RippleAPI
const api = new RippleAPI({
	server: 'wss://s.altnet.rippletest.net:51233'
})

type AsksAndBids = {
    asks: Ask[]
    bids: Bid[]
}

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