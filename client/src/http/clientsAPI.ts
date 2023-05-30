import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const getAllClients = async (page=1, limit=10, name="") =>{
    const {data} = await $authHost.get('api/clients/list', {params: {
            page, limit, name
        }})
    return {data}
}