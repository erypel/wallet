import { LoginState, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, CLEAR } from "./types";
import { Reducer } from "redux";

const initialState = { 
    loggedIn: true,
    loggingIn: false, 
    user: undefined,
    message: '' 
}

const reducer: Reducer<LoginState> = (state: LoginState = initialState, action) => {
    const { type, payload } = action
    console.log(state)
    switch (type) {
        case LOGIN_REQUEST:
            return {
                loggedIn: false,
                loggingIn: true,
                user: undefined,
                message: ''
              }
        case LOGIN_SUCCESS:
            return {
                loggingIn: false,
                loggedIn: true,
                user: payload,
                message: ''
            }
        case LOGIN_FAILURE:
            return {
                loggedIn: false,
                loggingIn: false,
                user: undefined,
                message: payload.message
            }
        case LOGOUT:
            return {
                loggedIn: false,
                loggingIn: false,
                user: undefined,
                message: ''
            }
        case CLEAR:
            return { ...state, message: payload }
        default:
            return state
    }
}

export default reducer