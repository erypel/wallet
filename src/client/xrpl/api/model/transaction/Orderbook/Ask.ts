import Amount from '../../Amount'

// this has the same structure as Bid
export default interface Ask {
    specification: Order
    properties: Properties
    data: object //can include lots of things
    state?: State
}

interface Order {
    direction: string
    quantity: Amount
    totalPrice: Amount
    expirationTime?: string
    fillOrKill?: boolean
    immediateOrCancel?: boolean
    memos?: object[]
    orderToReplace?: number
    passive?: boolean
}

interface State {
    fundedAmount: Amount
    priceOfFundedAmount: Amount
}

interface Properties {
    maker: string
    sequence: number
    makerExchangeRate: string
}