import Login from '../../model/Login'
import User from '../../model/User'
import salt from '../../utils/salt'

//TODO this is all api request stuff. I'm putting it here
//until I find a good way to eliminate redux boilerplate.
//I will eventually put this all in the store

//login store methods
async function login(login: Login): Promise<User | undefined> {
    return await fetch('http://localhost:7000/user/login', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(login),
        method: 'POST'
    }).then(async res => {
        console.log('success')
        const json = await res.json()
        console.log(json)
        return json
    }).catch(error => {
        console.log('fail')
        alert(error)
        return undefined
    })
}

async function logout(userId: string) {
    await fetch(`http://localhost:7000/user/logout/${userId}`, {
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
    await fetch('http://localhost:7000/user/create', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(user)
    }).then(response => {
        console.log(response)
        alert(response)
    }).catch(error => {
        alert(error)
    })
    return undefined
}

export const userService = {
    login,
    logout,
    register
}