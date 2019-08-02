import Button from '../component/Button'
import React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { logout } from '../store/login/actions'
import { connect } from 'react-redux'
import { AppState } from '../store/rootReducer'
import User from '../model/User'

interface Props {
    user?: User
    logout: (userId: string) => Promise<any>
}

class LogOutButton extends React.PureComponent<Props> {
    render() {
        return <Button
            onClick={this.logout}
            buttonText='Log Out'
        />
    }

    logout = () => {
        const { user, logout } = this.props
        logout(user!!.id!!)
    }
}

const mapStateToProps = (store: AppState) => {
    return {
        user: store.login.user
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        logout: (userId: string) => dispatch(logout(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOutButton)