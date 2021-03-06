import User from '../../model/User'
import { Action } from 'redux'
import UserDetail from '../../model/UserDetail'

export interface UserState {
    user?: User
    detail?: UserDetail
}

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE'
export const UPDATE_USER_DETAIL = 'USERS_UPDATE_DETAIL'
export const SET_USER = 'USERS_SET_USER'
export const SET_USER_DETAIL = 'USERS_SET_DETAIL'
export const CLEAR = 'USERS_CLEAR'

export interface CreateUserAction extends Action {
    type: typeof REGISTER_REQUEST
    payload: User
}

export interface UpdateUserAction extends Action {
    type: typeof REGISTER_REQUEST
    payload: UserDetail
}

export interface SuccessAction extends Action {
    type: typeof REGISTER_SUCCESS
    payload: null
}

export interface FailureAction extends Action {
    type: typeof REGISTER_FAILURE
    payload: null
}

export interface SetUserAction extends Action {
    type: typeof SET_USER
    payload: User
}

export interface SetUserDetailAction extends Action {
    type: typeof SET_USER_DETAIL
    payload: UserDetail
}

export interface ClearUserAction extends Action {
    type: typeof CLEAR
    payload: null
}

export type UserActions = CreateUserAction | SuccessAction | FailureAction 
    | UpdateUserAction | SetUserAction | UserDetail | ClearUserAction