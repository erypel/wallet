import Login from '../../model/Login'
import User from '../../model/User'

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

function logout() {
    alert('logout!')
}

//user store methods
//should use HTTPS
async function register(user: User): Promise<User | undefined> {
    await fetch('http://localhost:7000/user/create', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(user),
        method: 'POST'
    }).then(response => {
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