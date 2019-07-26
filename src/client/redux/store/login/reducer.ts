import { LoginState, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./types";
import { Reducer } from "redux";

const initialState = { 
    loggedIn: true,
    loggingIn: false, 
    user: undefined 
}

const reducer: Reducer<LoginState> = (state: LoginState = initialState, action) => {
    const { type, payload } = action
    console.log(state)
    switch (type) {
        case LOGIN_REQUEST:
            return {
                loggedIn: false,
                loggingIn: true,
                user: undefined
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

export default reducer