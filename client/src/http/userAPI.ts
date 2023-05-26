import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (login: string, password: string) =>{
    const {data} = await $host.post('api/user/registration', {login, password, role: 'WAITER'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const signIn = async (login: string, password: string) =>{
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () =>{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}