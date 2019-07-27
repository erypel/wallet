import React from 'react'
import Input from './Input'
import { Link } from 'react-router-dom'
import { history } from '../utils/history'
import validatePassword from '../utils/validatePassword'
import { createUser } from '../redux/store/user/actions'
import { AppState } from '../redux/rootReducer'
import User from '../model/User'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import PasswordRequirements from '../component/PasswordRequirements';
import Subheader from '../component/Subheader';

interface CreateUserState {
    username: string
    password: string
    verifyPassword: string
    firstName: string
    lastName: string
    email: string
}

interface CreateUserProps {
    createUser: (user:User) => Promise<any>
}

type FormFields = keyof CreateUserState

class CreateUserForm extends React.PureComponent<CreateUserProps, CreateUserState> {
    constructor(props: CreateUserProps) {
        super(props)

        this.state = {
            username: '',
            password: '',
            verifyPassword: '',
            firstName: '',
            lastName: '',
            email: ''
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
        const { firstName, lastName, username, password, email, verifyPassword } = this.state
        const { createUser } = this.props
        const passwordValidation = validatePassword(password)
        if(!passwordValidation.success){
            alert(passwordValidation.message)
        } else if(password !== verifyPassword){
            alert("Passwords do not match!")
        } else {
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                email: email,
                salt: ''
            }
            createUser(newUser)
            history.push('/login')
        }
    }
    
    render() {
        const { username, password, verifyPassword, firstName, lastName, email } = this.state
        return <div className='content'>
            <Subheader title='Sign Up'/>
            <form onSubmit={this.handleSubmit} className='login-form'>
                <Input required={true} id='firstName' type='text' value={firstName} onChange={this.handleChange} placeHolder='First Name'/>
                <Input required={true} id='lastName' type='text' value={lastName} onChange={this.handleChange} placeHolder='Last Name'/>
                <Input required={true} id='email' type='text' value={email} onChange={this.handleChange} placeHolder='Email'/> 
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

const mapStateToProps = (store: AppState) => {
    return {
        user: store.user.user
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        createUser: (user: User) => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm)