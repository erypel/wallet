export const ADD_ADDRESS = 'ADD_ADDRESS'

interface AddAddressAction {
    type: typeof ADD_ADDRESS
    payload: string
}

export type AddressActionTypes = AddAddressAction

export function addAddress(newAddress: string): AddressActionTypes {
    return {
        type: ADD_ADDRESS,
        payload: newAddress
    }
}