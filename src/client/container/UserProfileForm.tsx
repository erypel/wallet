import React from 'react'
import Subheader from '../component/Subheader'
import Input from '../library/Input'
import { Link } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../redux/rootReducer'
import { AnyAction } from 'redux'
import { connect } from 'react-redux'
import UserDetail from '../model/UserDetail'
import { updateUser } from '../redux/store/user/actions'
import { history } from '../utils/history'

interface UserProfileState {
    firstName: string
    lastName: string
    email: string
}

interface UserProfileProps {
    updateUser: (detail:UserDetail) => Promise<any>
    userDetail: UserDetail
    userId: string
}

type FormFields = keyof UserProfileState

class UserProfileForm extends React.PureComponent<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props)

        const { firstName, lastName, email } = props.userDetail

        this.state = {
            firstName: firstName,
            lastName: lastName,
            email: email
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
        const { updateUser, userId } = this.props
        const user: UserDetail = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userId: userId!!
        }
        updateUser(user)
        history.push('/home')
    }

    render() {
        const { firstName, lastName, email } = this.state
        return <div className='content'>
            <Subheader title='Edit Profile'/>
            <form onSubmit={this.handleSubmit} className='login-form'>
                <Input required={true} id='firstName' type='text' value={firstName} onChange={this.handleChange} placeHolder='First Name'/>
                <Input required={true} id='lastName' type='text' value={lastName} onChange={this.handleChange} placeHolder='Last Name'/>
                <Input required={true} id='email' type='text' value={email} onChange={this.handleChange} placeHolder='Email'/> 
                <Input id='submit' type='submit' value='Save'/>
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
        userId: store.login.user!!.id!!,
        userDetail: store.user.detail!!
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        updateUser: (detail: UserDetail) => dispatch(updateUser(detail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileForm)