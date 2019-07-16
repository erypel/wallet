import { createStore } from 'redux'
import User from '../../model/User';

const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST'
const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS'
const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE'
const LOGOUT = 'USERS_LOGOUT'

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST
    payload: User
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS
    payload: User
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE
    payload: Error
}

interface LogoutAction {
    type: typeof LOGOUT
    payload: null
}

type Actions= LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutAction

function reducer(state = {}, action: Actions) {
    const { type } = action
    switch (type) {
        case LOGIN_REQUEST:
            return {}
        case LOGIN_SUCCESS:
            return {}
        case LOGIN_FAILURE:
            return {}
        case LOGOUT:
            return {}
        default:
            return state
    }
}

function loginRequestAction(): LoginRequestAction {

}

function loginSuccessAction(): LoginSuccessAction {

}

function loginFailureAction(): LoginFailureAction {

}

function logoutAction(): LogoutAction {
    return { type: LOGOUT, payload: null}
}

export const LoginStore = createStore(reducer)

export function login(username: string, password: string) {
    
}

export function logout() {
    LoginStore.dispatch(logoutAction())
}