import Amount from '../../Amount'

// this has the same structure as Bid
export default interface Ask {
    specificaton: object //order
    properties: Properties
    data: object //can include lots of things
    state?: State
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