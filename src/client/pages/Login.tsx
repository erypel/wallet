import LoginContainer from "../component/Login";
import React from "react";
import { Link } from "react-router-dom";

class Login extends React.PureComponent {
    render() {
        return <div>
            <LoginContainer/>
            <Link to='/register'>Sign up</Link>
        </div>
    }
}

export default Login