import { ActionCreator, Dispatch } from 'redux'
import { REGISTER_REQUEST, SuccessAction, REGISTER_SUCCESS, REGISTER_FAILURE, FailureAction, CreateUserAction } from './types';
import User from '../../../model/User'
import { userService } from '../../services/userService'

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

export const success: ActionCreator<SuccessAction> = () => ({
    type: REGISTER_SUCCESS,
    payload: null 
})

export const failure: ActionCreator<FailureAction> = () => ({
    type: REGISTER_FAILURE,
    payload: null
})