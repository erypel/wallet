import React from 'react';
import Input from './Input';
import { UserStore, createUser } from '../redux/store/UserStore';

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
        const { firstName, lastName, username, password, email } = this.state
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
        }
        createUser(newUser)
    }
    
    render() {
        const { username, password, verifyPassword, firstName, lastName, email } = this.state
        return <>
            <h2>Create User</h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                    First Name: 
                    <Input id='firstName' type='text' value={firstName} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Last Name: 
                    <Input id='lastName' type='text' value={lastName} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Email: 
                    <Input id='email' type='text' value={email} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Username: 
                    <Input id='username' type='text' value={username} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Password: 
                    <Input id='password' type='password' value={password} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Verify Password: 
                    <Input id='verifyPassword' type='password' value={verifyPassword} onChange={this.handleChange}/>
                </label>
                <br/>
                <Input id='submit' type='submit' value='Register'/>
            </form>
        </>
    }
}

export default CreateUserForm