interface Currency {
    id: number
    title: string
    selected: boolean
    key: string
}

 interface CurrencyState {
    currencies: Currency[]
}
//TODO these should be kept server side with a local instance in case the server is unreachable
const CurrencyState: CurrencyState = {
    currencies: [{
        id: 0,
        title: 'XRP',
        selected: false,
        key: 'currency'
    },
    {
      id: 1,
      title: 'USD',
      selected: false,
      key: 'currency'
    }]
}

const actions = {
    ADD_CURRENCY: ''
}

function reducer(state = CurrencyState, action: string, payload: Currency): CurrencyState {
    switch (action) {
        case actions.ADD_CURRENCY:
            return { currencies: [...state.currencies, payload] }
        default:
            return state
    }
}

export default CurrencyState