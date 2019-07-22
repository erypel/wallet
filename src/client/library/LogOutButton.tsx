import Button from "./Button";
import React from "react";
import { loginStore } from "../redux/store/LoginStore";

class LogOutButton extends React.PureComponent {
    render() {
        return <Button
            onClick={this.logout}
            buttonText='Log Out'
        />
    }

    logout = () => {
        loginStore.logout()
    }
}

export default LogOutButton