import { ActionCreator, Dispatch } from 'redux'
import Login from '../../model/Login'
import { 
    LOGIN_REQUEST,
    LoginRequestAction, 
    LoginSuccessAction, 
    LoginFailureAction, 
    LOGIN_FAILURE, 
    LOGOUT, 
    LogoutAction, 
    LOGIN_SUCCESS, 
    CLEAR, 
    ClearErrorMessageAction 
} from './types'
import { userService } from '../../services/userService'
import User from '../../model/User'
import { history } from '../../utils/history'
import { setUser, clearUser, setUserDetail } from '../user/actions'
import Pair from '../../model/Pair'

export const login: ActionCreator<any> = (username: string, password: string, intial?: boolean) => {
    return async (dispatch: Dispatch) => {
        const login = { username, password }
        dispatch(loginRequestAction(login))
        userService.login(login).then((pair?: Pair) => {
            if (pair) {
                const user = pair.first
                const detail = pair.second
                dispatch(loginSuccessAction(user))
                dispatch(setUser(user))
                dispatch(setUserDetail(detail))
                if(intial) {
                    history.push('/profile')
                } else {
                    history.push('/home')
                }
            } else {
                dispatch(loginFailureAction(new Error("Incorrect username or password.")))
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
        dispatch(clearUser())
        history.push('/')
    }
}

export function clearErrorMessageAction(): ClearErrorMessageAction {
    return { type: CLEAR, payload: '' }
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