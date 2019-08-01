import { ActionCreator, Dispatch } from 'redux'
import { REGISTER_REQUEST, SuccessAction, REGISTER_SUCCESS, REGISTER_FAILURE, FailureAction, CreateUserAction, UPDATE_USER_DETAIL, SetUserAction, SET_USER, ClearUserAction, CLEAR, SetUserDetailAction, SET_USER_DETAIL } from './types';
import User from '../../model/User'
import { userService } from '../../services/userService'
import UserDetail from '../../model/UserDetail'

export const createUser: ActionCreator<any> = (user: User) => {
    return async (dispatch: Dispatch) => {
        const createUserAction = {
            type: REGISTER_REQUEST, 
            payload: user
        }
        
        const newUser = await userService.register(user)
        if(newUser) {
            dispatch(success())
        } else {
            dispatch(failure())
        }
        return dispatch(createUserAction)
    }
}

export const updateUser: ActionCreator<any> = (detail: UserDetail) => {
    return async (dispatch: Dispatch) => {
        const updateUserAction = {
            type: UPDATE_USER_DETAIL, 
            payload: detail
        }
        await userService.update(detail)
        return dispatch(updateUserAction)
    }
}

export const setUser: ActionCreator<SetUserAction> = (user: User) => ({
    type: SET_USER,
    payload: user
})

export const setUserDetail: ActionCreator<SetUserDetailAction> = (detail: UserDetail) => ({
    type: SET_USER_DETAIL,
    payload: detail
})

export const clearUser: ActionCreator<ClearUserAction> = () => ({
    type: CLEAR,
    payload: null
})

export const success: ActionCreator<SuccessAction> = () => ({
    type: REGISTER_SUCCESS,
    payload: null 
})

export const failure: ActionCreator<FailureAction> = () => ({
    type: REGISTER_FAILURE,
    payload: null
})