import LoginForm from '../LoginForm'
import React from 'react'
import { Link } from "react-router-dom"
import { AppState } from '../../redux/rootReducer';
import { connect } from 'react-redux';

interface Props {
    message: string
}

class Login extends React.PureComponent<Props> {
    render() {
        const { message } = this.props
        return <div className='content'>
            {(message != '') && <p className='error-message'>{message}</p>}
            <LoginForm/>
            <p>Don't have an account? <Link to='/register'>Sign up!</Link></p>
        </div>
    }
}

const mapStateToProps = (store: AppState) => {
    return {
        message: store.login.message
    }
}

export default connect(mapStateToProps)(Login)