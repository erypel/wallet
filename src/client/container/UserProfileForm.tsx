import User from "../model/User";
import React from "react";
import Subheader from "../component/Subheader";
import Input from "../library/Input";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../redux/rootReducer";
import { AnyAction } from "redux";
import { connect } from "react-redux";

interface UserProfileState {
    firstName: string
    lastName: string
    email: string
}

interface UserProfileProps {
    updateUser: (user:User) => Promise<any>
}

type FormFields = keyof UserProfileState

class UserProfileForm extends React.PureComponent<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props)

        this.state = {
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
        } as Pick<UserProfileState, FormFields>)
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { firstName, lastName, email } = this.state
        const { updateUser } = this.props
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        updateUser(user)
    }

    render() {
        const { firstName, lastName, email } = this.state
        return <div className='content'>
            <Subheader title='Edit Profile'/>
            <form onSubmit={this.handleSubmit} className='login-form'>
                <Input required={true} id='firstName' type='text' value={firstName} onChange={this.handleChange} placeHolder='First Name'/>
                <Input required={true} id='lastName' type='text' value={lastName} onChange={this.handleChange} placeHolder='Last Name'/>
                <Input required={true} id='email' type='text' value={email} onChange={this.handleChange} placeHolder='Email'/> 
                <Input id='submit' type='submit' value='Register'/>
            </form>
            <br/>
            <Link to='/home'>Skip for now.</Link>
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
        updateUser: (user: User) => dispatch(updateUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileForm)