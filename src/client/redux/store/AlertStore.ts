import { createStore } from 'redux'

const SUCCESS = 'SUCCESS'
const ERROR = 'ERROR'
const CLEAR = 'CLEAR'

interface SuccessAction {
    type: typeof SUCCESS
    payload: string
}

interface ErrorAction {
    type: typeof ERROR
    payload: string
}

interface ClearAction {
    type: typeof CLEAR
    payload: null
}

type Actions = SuccessAction | ErrorAction | ClearAction

function reducer(state = {}, action: Actions) {
    const { type } = action
    switch (type) {
        case SUCCESS:
            return {
                type: SUCCESS,
                message: action.payload
            }
        case ERROR:
            return {
                type: ERROR,
                message: action.payload
            }
        case CLEAR:
            return {}
        default:
            return state
    }
}

function successAction(message: string): SuccessAction {
    return { type: SUCCESS, payload: message }
}

function errorAction(message: string): ErrorAction {
    return { type: ERROR, payload: message }
}

function clearAction(): ClearAction {
    return { type: CLEAR, payload: null }
}

export const AlertStore = createStore(reducer)

function success(message: string) {
    AlertStore.dispatch(successAction(message))
}

function error(message: string) {
    AlertStore.dispatch(errorAction(message))
}

function clear() {
    AlertStore.dispatch(clearAction())
}

export const alerts = {
    success,
    error,
    clear
}