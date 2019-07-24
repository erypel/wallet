import React from 'react'
import Input from './Input'
import { createUser } from '../redux/store/UserStore'
import { Link } from 'react-router-dom'
import { history } from '../utils/history'
import validatePassword from '../utils/validatePassword';

interface CreateUserState {
    username: string
    password: string
    verifyPassword: string
    firstName: string
    lastName: string
    email: string
}

type FormFields = keyof CreateUserState

class CreateUserForm extends React.PureComponent<{}, CreateUserState> {
    constructor() {
        super({})

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
        return <>
            <h2>Create User</h2>
            <h2>Passwords must meet these conditions: </h2>
		    <ul>
                <li>At least one uppercase english letter [A-Z]</li>
                <li>At least one lowercase english letter [a-z]</li>
                <li>At least one digit [0-9]</li>
                <li>At least one special character [#?!@ $%^&*-]</li>
                <li>Minimum length 10, maximum length 128</li>
		    </ul>
            <form onSubmit={this.handleSubmit}>
                <label>
                    First Name: 
                    <Input required={true} id='firstName' type='text' value={firstName} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Last Name: 
                    <Input required={true} id='lastName' type='text' value={lastName} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Email: 
                    <Input required={true} id='email' type='text' value={email} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Username: 
                    <Input required={true} id='username' type='text' value={username} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Password: 
                    <Input required={true} id='password' type='password' value={password} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Verify Password: 
                    <Input required={true} id='verifyPassword' type='password' value={verifyPassword} onChange={this.handleChange}/>
                </label>
                <br/>
                <Input id='submit' type='submit' value='Register'/>
            </form>
            <br/>
            <Link to='/login'>Back to login</Link>
            <br/>
        </>
    }
}

export default CreateUserForm