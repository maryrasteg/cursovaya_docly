import {$authHost, $host} from "./index";

export const getAllReceptions = async (page=1, limit=10, selectedDoctor= {}, searchDate="") =>{
    const {data} = await $authHost.get('api/receptions/list', {params: {
            page, limit, selectedDoctor, searchDate
        }})
    return {data}
}
export const getMonthReceptions = async () => {
    const {data} = await $authHost.get('api/receptions/month')
    return {data}
}