import Login from '../../model/Login'
import User from '../../model/User'

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
//should use HTTPS
async function register(user: User): Promise<User | undefined> {
    await fetch('http://localhost:7000/user/create', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(user),
        method: 'POST'
    }).then(response => {
        alert(response)
    }).catch(error => {
        alert(error)
    })
    return undefined
}

async function post (path: string, data: any) {
    return await window.fetch(path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }

export const userService = {
    login,
    logout,
    register
}