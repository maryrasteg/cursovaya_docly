import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const getAllClients = async () =>{
    const {data} = await $authHost.get('api/clients/list')
    return {data}
}