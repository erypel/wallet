import Login from '../../model/Login'
import User from '../../model/User'
import crypto from 'crypto';

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
    const salted = saltHashPassword(user.password)
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

function saltHashPassword(
	password: string,
	salt: string = randomString()
) {
	const hash = crypto
	.createHmac('sha512', salt)
	.update(password)
	return {
		salt,
		hash: hash.digest('hex')
	}
}

function randomString(){
	return crypto.randomBytes(4).toString('hex')
}

export const userService = {
    login,
    logout,
    register
}