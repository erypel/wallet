//TODO this whole file is incorrect and needs a thorough thinking thru

//TODO these should be kept server side with a local instance in case the server is unreachable
const CurrencyStore: object = {
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

const reducer = (state: object, action: string, payload: object) => {
    switch (action) {
        case actions.ADD_CURRENCY:
            return {...state, payload}
        default:
            return state
    }
}

export default CurrencyStore