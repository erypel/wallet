import { createStore } from 'redux'

const ADD_ADDRESS = 'ADD_ADDRESS'

interface State {
    addresses: string[]
}

const initialState: State = {
    addresses: []
}

interface AddAddressAction {
    type: typeof ADD_ADDRESS
    payload: string
}

type Actions = AddAddressAction

function reducer(state = initialState, action: Actions): State {
    const { type, payload } = action
    switch(type) {
        case ADD_ADDRESS:
            return {
                addresses: [...state.addresses, payload]
            }
        default:
            return state
    }
}

export function addAddress(newAddress: string): AddAddressAction {
    return {
        type: ADD_ADDRESS,
        payload: newAddress
    }
}

export type AppState = ReturnType<typeof reducer>

const AddressStore = createStore(reducer)
export default AddressStore