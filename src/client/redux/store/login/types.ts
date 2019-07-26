import Login from "../../../model/Login";
import User from "../../../model/User";

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE'
export const LOGOUT = 'USERS_LOGOUT'

export interface LoginRequestAction {
    type: typeof LOGIN_REQUEST
    payload: Login
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS
    payload: User
}

export interface LoginFailureAction {
    type: typeof LOGIN_FAILURE
    payload: Error
}

export interface LogoutAction {
    type: typeof LOGOUT
    payload: undefined
}

export interface LoginState {
    loggedIn: boolean
    loggingIn: boolean
    user?: User
}

export type LoginActions= LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutAction