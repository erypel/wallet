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
        return <>
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username: 
                    <Input id='username' type='text' value='' onChange={this.handleChange}/>
                </label>
                <label>
                    Password: 
                    <Input id='password' type='password' value='' onChange={this.handleChange}/>
                </label>
                <Input id='submit' type='submit' value='Login'/>
            </form>
        </>
    }
}