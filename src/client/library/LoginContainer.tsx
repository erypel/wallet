import React from "react";
import Input from "./Input";

interface LoginContainerState {
    username: string
    password: string
}

type FormFields = keyof LoginContainerState

export default class LoginContainer extends React.PureComponent<{}, LoginContainerState> {
    constructor() {
        super({})

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
        alert("Logging in")
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