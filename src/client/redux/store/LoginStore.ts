import { createStore } from 'redux'
import User from '../../model/User';
import Login from '../../model/Login';
import { userService } from '../services/userService';
import { AlertStore, alerts } from './AlertStore';

const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST'
const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS'
const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE'
const LOGOUT = 'USERS_LOGOUT'

interface LoginRequestAction {
    type: typeof LOGIN_REQUEST
    payload: Login
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
    payload: undefined
}

interface State {
    loggedIn: boolean
    loggingIn: boolean
    user?: User | Login | Error | undefined
}

type Actions= LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutAction

let user = null
const initialState = user ? { 
    loggedIn: true,
    loggingIn: false, 
    user: user 
} : {
    loggedIn: false,
    loggingIn: false,
    user: undefined
}
function reducer(state: State = initialState, action: Actions): State {
    const { type, payload } = action
    switch (type) {
        case LOGIN_REQUEST:
            return {
                loggedIn: false,
                loggingIn: true,
                user: payload
              }
        case LOGIN_SUCCESS:
            return {
                loggingIn: false,
                loggedIn: true,
                user: payload
            }
        case LOGIN_FAILURE:
            return {
                loggedIn: false,
                loggingIn: false,
                user: undefined
            }
        case LOGOUT:
            return {
                loggedIn: false,
                loggingIn: false,
                user: undefined
            }
        default:
            return state
    }
}

function loginRequestAction(login: Login): LoginRequestAction {
    return { type: LOGIN_REQUEST, payload: login}
}

function loginSuccessAction(user: User): LoginSuccessAction {
    return { type: LOGIN_SUCCESS, payload: user }
}

function loginFailureAction(error: Error): LoginFailureAction {
    return { type: LOGIN_FAILURE, payload: error}
}

function logoutAction(): LogoutAction {
    return { type: LOGOUT, payload: undefined}
}

export const LoginStore = createStore(reducer)

export function login(username: string, password: string) {
    const login = {username, password}
    LoginStore.dispatch(loginRequestAction(login))
    userService.login(login).then((user?: User) => {
        if (user) {
            LoginStore.dispatch(loginSuccessAction(user))
        } else {
            const error = new Error('user is undefined')
            
        }
    }, (error: Error) => {
        LoginStore.dispatch(loginFailureAction(error))
        alerts.error(error.message)
    })
}

export function logout() {
    userService.logout()
    LoginStore.dispatch(logoutAction())
}