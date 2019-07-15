import { createStore } from 'redux'

const ADD_ADDRESS = 'ADD_ADDRESS'

interface AddressState {
    addresses: string[]
}

const initialState: AddressState = {
    addresses: []
}

interface AddAddressAction {
    type: typeof ADD_ADDRESS
    payload: string
}

export type AddressActionTypes = AddAddressAction

function addressReducer(state = initialState, action: AddressActionTypes): AddressState {
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

export function addAddress(newAddress: string): AddressActionTypes {
    return {
        type: ADD_ADDRESS,
        payload: newAddress
    }
}

export type AppState = ReturnType<typeof addressReducer>

const AddressStore = createStore(addressReducer)
export default AddressStore