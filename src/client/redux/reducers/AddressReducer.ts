import { ADD_ADDRESS, AddressActionTypes } from "../actions/AddressActions"

interface AddressState {
    addresses: string[]
}

export type AddressType = AddressState

const initialState: AddressState = {
    addresses: []
}

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

export type AppState = ReturnType<typeof addressReducer>
export default addressReducer