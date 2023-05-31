import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const getOneReception = async (id: any) =>{
    const {data} = await $authHost.get('api/receptions/'+id)
    return {data}
}

export const deleteReception = async (id: any) =>{
    const {data} = await $authHost.delete('api/receptions/delete?id='+id)
    return {data}
}