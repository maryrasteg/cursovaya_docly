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

export const listUsers = async (page=1, limit=20) =>{
    const {data} = await $authHost.get('api/user/list', {params: {
        page, limit
    }})
    return {data}
}

export const getAllClients = async (page=1, limit=10, name="") =>{
    const {data} = await $authHost.get('api/clients/list', {params: {
            page, limit, name
        }})
    return {data}
}

export const updateUser = async (id: number, login: string, role: string) =>{
    const {data} = await $authHost.put('api/user/edit?id=' + id, {login, role})
    return "success!"
}