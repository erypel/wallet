import React from 'react'
import Input from '../component/Input'
import { ThunkDispatch } from 'redux-thunk'
import { login, clearErrorMessageAction } from '../store/login/actions'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'

interface LoginContainerState {
    username: string
    password: string
}

interface LoginContainerProps {
    loginUser: (username: string, password: string) => Promise<any>
    clearMessage: () => void
}

type FormFields = keyof LoginContainerState

class LoginForm extends React.PureComponent<LoginContainerProps, LoginContainerState> {
    constructor(props: LoginContainerProps) {
        super(props)
        this.props.clearMessage()
        this.state = {
            username: '',
            password: ''
        }
    }
    
    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget
        this.props.clearMessage()
        this.setState({
            [id]: value
        } as Pick<LoginContainerState, FormFields>)
    }
    
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { loginUser } = this.props
        loginUser(this.state.username, this.state.password)
    }

    render() {
        const { username, password } = this.state
        return <form onSubmit={this.handleSubmit} className='login-form'>
                <Input 
                    id='username'
                    type='text' 
                    value={username} 
                    placeHolder={'Username'} 
                    onChange={this.handleChange} 
                    required={true}
                />
                <br/>
                <Input 
                    id='password' 
                    type='password' 
                    value={password} 
                    placeHolder={'Password'} 
                    onChange={this.handleChange} 
                    required={true}
                />
                <br/>
                <Input id='submit' type='submit' value='Login'/>
            </form>
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        loginUser: (username: string, password: string) => dispatch(login(username, password)),
        clearMessage: () => dispatch(clearErrorMessageAction())
    }
}

export default connect(undefined, mapDispatchToProps)(LoginForm)