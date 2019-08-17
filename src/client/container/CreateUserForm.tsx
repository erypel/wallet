import React from 'react'
import Input from '../component/Input'
import { Link } from 'react-router-dom'
import validatePassword from '../utils/validatePassword'
import { createUser } from '../store/user/actions'
import User from '../model/User'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import PasswordRequirements from '../component/PasswordRequirements'
import Subheader from '../component/Subheader'
import { login } from '../store/login/actions'

interface CreateUserState {
    username: string
    password: string
    verifyPassword: string
}

interface CreateUserProps {
    createUser: (user:User) => Promise<any>
    login: (username: string, password: string) => Promise<any>
}

type FormFields = keyof CreateUserState

class CreateUserForm extends React.PureComponent<CreateUserProps, CreateUserState> {
    constructor(props: CreateUserProps) {
        super(props)

        this.state = {
            username: '',
            password: '',
            verifyPassword: ''
        }
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { currentTarget } = event
        const { value, id } = currentTarget

        this.setState({
            [id]: value
        } as Pick<CreateUserState, FormFields>)
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()
        const { username, password, verifyPassword } = this.state
        const { createUser, login } = this.props
        const passwordValidation = validatePassword(password)
        if(!passwordValidation.success){
            alert(passwordValidation.message)
        } else if(password !== verifyPassword){
            alert("Passwords do not match!")
        } else {
            const newUser = {
                firstName: '',
                lastName: '',
                username: username,
                password: password,
                email: '',
                salt: ''
            }
            createUser(newUser).then(() => {login(username, password)})
        }
    }
    
    render() {
        const { username, password, verifyPassword } = this.state
        return <div className='content'>
            <Subheader title='Sign Up'/>
            <form onSubmit={this.handleSubmit} className='login-form'>
                <Input required={true} id='username' type='text' value={username} onChange={this.handleChange} placeHolder='Username'/>
                <Input required={true} id='password' type='password' value={password} onChange={this.handleChange} placeHolder='Password'/>
                <Input required={true} id='verifyPassword' type='password' value={verifyPassword} onChange={this.handleChange} placeHolder='Verify Password'/>
                <Input id='submit' type='submit' value='Register'/>
            </form>
            <PasswordRequirements/>
            <br/>
            <Link to='/login'>Back to login</Link>
            <br/>
            <br/>
        </div>
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        createUser: (user: User) => dispatch(createUser(user)),
        login: (username: string, password: string) => dispatch(login(username, password, true))
    }
}

export default connect(undefined, mapDispatchToProps)(CreateUserForm)