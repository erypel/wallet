import LoginForm from '../component/LoginForm'
import React from 'react'
import { Link } from "react-router-dom"

class Login extends React.PureComponent {
    render() {
        return <div className='content'>
            <LoginForm/>
            <br/>
            <Link to='/register'>Sign up</Link>
        </div>
    }
}

export default Login