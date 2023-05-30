import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const getAllReceptions = async (page=1, limit=10, selectedDoctor= {}) =>{
    const {data} = await $authHost.get('api/receptions/list', {params: {
            page, limit, selectedDoctor
        }})
    return {data}
}