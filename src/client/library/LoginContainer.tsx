import React from "react"
import Input from "./Input"
import { AppState } from "../redux/rootReducer"
import { ThunkDispatch } from "redux-thunk"
import { login } from "../redux/store/login/actions"
import { AnyAction } from "redux"
import { connect } from "react-redux"


interface LoginContainerState {
    username: string
    password: string
}

interface LoginContainerProps {
    loginUser: (username: string, password: string) => Promise<any>
}

type FormFields = keyof LoginContainerState

class LoginContainer extends React.PureComponent<LoginContainerProps, LoginContainerState> {
    constructor(props: LoginContainerProps) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }
    
    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget

        this.setState({
            [id]: value
        } as Pick<LoginContainerState, FormFields>)
    }
    
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { loginUser } = this.props
        loginUser(this.state.username, this.state.password)
    }

    //TODO forms can probably be their own component
    render() {
        const { username, password } = this.state
        return <>
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username: 
                    <Input id='username' type='text' value={username} onChange={this.handleChange}/>
                </label>
                <label>
                    Password: 
                    <Input id='password' type='password' value={password} onChange={this.handleChange}/>
                </label>
                <Input id='submit' type='submit' value='Login'/>
            </form>
        </>
    }
}

const mapStateToProps = (store: AppState) => {
    return {
        login: store.login
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        loginUser: (username: string, password: string) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)