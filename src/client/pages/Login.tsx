import LoginContainer from "../library/LoginContainer";
import React from "react";

class Login extends React.PureComponent {
    render() {
        return <div>
            <LoginContainer/>
            <p>create user</p>
        </div>
    }
}

export default Login