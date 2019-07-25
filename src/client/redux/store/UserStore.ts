import User from "../../model/User";
import { createStore } from "redux";
import { userService } from "../services/userService";
import { alerts } from "./AlertStore";

const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST'
const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS'
const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE'

interface CreateUserAction {
    type: typeof REGISTER_REQUEST
    payload: User
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

export function reducer(state = {}, action: Actions) {
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

function createUserAction(user: User): CreateUserAction {
    return { type: REGISTER_REQUEST, payload: user}
}

function successAction(): SuccessAction {
    return { type: REGISTER_SUCCESS, payload: null }
}

function failureAction(): FailureAction {
    return { type: REGISTER_FAILURE, payload: null }
}

export const UserStore = createStore(reducer)

export function createUser(user: User) {
    UserStore.dispatch(createUserAction(user))

    userService.register(user).then((user?: User) => {
        UserStore.dispatch(successAction())
        alerts.success('Registration successful!')
    }, (error: Error) => {
        UserStore.dispatch(failureAction())
        alerts.error(error.message)
    })
}