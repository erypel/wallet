import { Reducer } from 'redux'
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, UserState } from './types';

const initialState: UserState = {
    user: undefined
}

const reducer: Reducer<UserState> = (state: UserState = initialState, action) => {
    const { type, payload } = action
    switch(type) {
        case REGISTER_REQUEST:
            return { user: payload }
        case REGISTER_SUCCESS:
            return {}
        case REGISTER_FAILURE:
            return {}
        default:
            return state
    }
}

export default reducer