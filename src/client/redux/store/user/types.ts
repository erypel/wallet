import User from "../../../model/User";
import { Action } from "redux";

export interface UserState {
    user?: User
}

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE'

export interface CreateUserAction extends Action {
    type: typeof REGISTER_REQUEST
    payload: User
}

export interface SuccessAction extends Action {
    type: typeof REGISTER_SUCCESS
    payload: null
}

export interface FailureAction extends Action {
    type: typeof REGISTER_FAILURE
    payload: null
}

export type UserActions = CreateUserAction | SuccessAction | FailureAction