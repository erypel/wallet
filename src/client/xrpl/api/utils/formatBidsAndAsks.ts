import { AsksAndBids } from '../model/transaction/Orderbook/Orderbook'

const RippleAPI = require('ripple-lib').RippleAPI

export default function formatBidsAndAsks(orderbookInfo: any, offers: any): Promise<AsksAndBids> {
    return RippleAPI.formatBidsAndAsks(orderbookInfo, offers)
}