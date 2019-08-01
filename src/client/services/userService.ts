import Login from '../model/Login'
import User from '../model/User'
import salt from '../utils/salt'
import UserDetail from '../model/UserDetail'
import Pair from '../model/Pair'

//login store methods
async function login(login: Login): Promise<Pair | undefined> {
    return await fetch('http://localhost:7000/user/login/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        },
        credentials: 'include',
        body: JSON.stringify(login),
        method: 'POST'
    }).then(async res => {
        return await res.json()
    }).catch(() => {
        return undefined
    })
}

async function logout(userId: string) {
    await fetch(`http://localhost:7000/user/logout/${userId}/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST'
    }).then(response => {
        console.log(response)
    }).catch(error => {
        alert(error)
    })
}

//user store methods
//should use HTTPS
async function register(user: User): Promise<User | undefined> {
    const salted = salt(user.password)
    user.password = salted.hash
    user.salt = salted.salt
    const newUser = {
        username: user.username,
        password: user.password,
        salt: user.salt
    }
    await fetch('http://localhost:7000/user/create/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(newUser)
    }).then(response => {
        console.log(response)
    }).catch(error => {
        alert(error)
    })
    return undefined
}

async function update(detail: UserDetail): Promise<any> {
    return await fetch('http://localhost:7000/user/update/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
        },
        credentials: 'include',
        body: JSON.stringify(detail),
        method: 'POST'
    }).then(async res => {
        return await res.json()
    }).catch(() => {
        return undefined
    })
}

export const userService = {
    login,
    logout,
    register,
    update
}