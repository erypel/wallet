import { Reducer } from 'redux'
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, UserState, UPDATE_USER } from './types';

const initialState: UserState = {
    user: undefined,
    detail: undefined
}

const reducer: Reducer<UserState> = (state: UserState = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case REGISTER_REQUEST:
            return { ...state, user: payload }
        case REGISTER_SUCCESS:
            return {...state}
        case REGISTER_FAILURE:
            return {...state}
        case UPDATE_USER:
            return {...state, detail: payload}
        default:
            return {...state}
    }
}

export default reducer