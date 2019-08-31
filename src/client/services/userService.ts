import Login from '../model/Login'
import User from '../model/User'
import salt from '../utils/salt'
import UserDetail from '../model/UserDetail'
import Pair from '../model/Pair'
import { http } from './httpService'

//login store methods
async function login(login: Login): Promise<Pair | undefined> {
    return await http.post(
        'http://localhost:7000/user/login/',
        JSON.stringify(login)
    )
}

async function logout(userId: string) {
    await http.post(
        `http://localhost:7000/user/logout/${userId}/`,
        null
    )
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
    await http.post(
        'http://localhost:7000/user/create/',
        JSON.stringify(newUser)
    )
    return undefined
}

async function update(detail: UserDetail): Promise<any> {
    return await http.post(
        'http://localhost:7000/user/update/',
        JSON.stringify(detail)
    )
}

export const userService = {
    login,
    logout,
    register,
    update
}