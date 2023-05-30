import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const getOneClient = async (id: any) =>{
    const {data} = await $authHost.get('api/clients/'+id)
    return {data}
}

export const createClient = async (surname: string, first_name: string, middle_name: string, birth: any, phone: string) => {
    const {data} = await $authHost.post('api/clients/add', {surname, first_name, middle_name, birth, phone})
    return "success!"
}
export const updateClient = async (id: any, surname: string, first_name: string, middle_name: string, birth: any, phone: string) => {
    const {data} = await $authHost.post('api/clients/edit?id=' + id, {surname, first_name, middle_name, birth, phone})
    return "success!"
}

export const deleteClient = async (id: any) => {
    const {data} = await $authHost.delete('api/clients/delete?id=' + id)
    return {data}
}