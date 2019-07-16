import Login from "../../model/Login";
import User from "../../model/User";

//TODO this is all api request stuff. I'm putting it here
//until I find a good way to eliminate redux boilerplate.
//I will eventually put this all in the store

//login store methods
function login(login: Login) {
    alert('login!')
}

function logout() {
    alert('logout!')
}

//user store methods
function register(user: User) {
    alert('register!')
}

export const userService = {
    login,
    logout,
    register
}