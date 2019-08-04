const RippleAPI = require('ripple-lib').RippleAPI

export default function formatBidsAndAsks(orderbookInfo: any, offers: any) {
    return RippleAPI.formatBidsAndAsks(orderbookInfo, offers)
}