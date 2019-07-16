import User from "../../model/User";
import { createStore } from "redux";

const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST'
const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS'
const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE'

interface CreateUserAction {
    type: typeof REGISTER_REQUEST
    payload: boolean
}

interface SuccessAction {
    type: typeof REGISTER_SUCCESS
    payload: null
}

interface FailureAction {
    type: typeof REGISTER_FAILURE
    payload: null
}

type Actions = CreateUserAction | SuccessAction | FailureAction

function reducer(state = {}, action: Actions) {
    const { type, payload } = action
    switch(type) {
        case REGISTER_REQUEST:
            return { registering: payload }
        case REGISTER_SUCCESS:
            return {}
        case REGISTER_FAILURE:
            return {}
        default:
            return state
    }
}

function createUser(user: User) {

}

export const UserStore = createStore(reducer)