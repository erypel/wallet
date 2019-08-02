import { AsksAndBids } from '../rippled/model/transaction/Orderbook/Orderbook'

async function getOrderbook(): Promise<AsksAndBids>{
    return {bids: [], asks: []}
}

export const orderbookService = {
    getOrderbook
}