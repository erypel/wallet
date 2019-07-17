import Login from "../../model/Login";
import User from "../../model/User";

//TODO this is all api request stuff. I'm putting it here
//until I find a good way to eliminate redux boilerplate.
//I will eventually put this all in the store

//login store methods
async function login(login: Login): Promise<User | undefined> {
    alert('login!')
    return undefined
}

function logout() {
    alert('logout!')
}

//user store methods
async function register(user: User): Promise<User | undefined> {
    alert('register!')
    return undefined
}

export const userService = {
    login,
    logout,
    register
}