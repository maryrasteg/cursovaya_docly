import {$authHost, $host} from "./index";

export const getAllClients = async (page=1, limit=10, name="") =>{
    const {data} = await $authHost.get('api/clients/list', {params: {
            page, limit, name
        }})
    return {data}
}