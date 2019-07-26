import { ActionCreator, Dispatch } from "redux"
import Login from "../../../model/Login"
import { LOGIN_REQUEST, LoginRequestAction, LoginSuccessAction, LoginFailureAction, LOGIN_FAILURE, LOGOUT, LogoutAction, LOGIN_SUCCESS } from "./types"
import { userService } from "../../services/userService"
import User from "../../../model/User"
import { history } from '../../../utils/history'

export const login: ActionCreator<any> = (username: string, password: string) => {
    return async (dispatch: Dispatch) => {
        const login = { username, password }
        dispatch(loginRequestAction(login))
        userService.login(login).then((user?: User) => {
            if (user) {
                dispatch(loginSuccessAction(user))
                history.push('/home')
            } else {
                const error = new Error('user is undefined')
                console.log(error)
            }
        }, (error: Error) => {
            dispatch(loginFailureAction(error))
            console.log(error.message)
        })
    }
}

export const logout: ActionCreator<any> = (userId: string) => {
    return async (dispatch: Dispatch) => {
        userService.logout(userId)
        dispatch(logoutAction())
        history.push('/')
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