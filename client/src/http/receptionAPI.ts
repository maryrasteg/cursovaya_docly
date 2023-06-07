import {$authHost, $host} from "./index";

export const createReception = async (date: string, time: string, clientId: number, doctorId: number, procedureId: number, note:string) => {
    const {data} = await $authHost.post('api/receptions/add', {date, time, clientId, doctorId, procedureId, note})
    return "success!"
}
export const getOneReception = async (id: any) =>{
    const {data} = await $authHost.get('api/receptions/'+id)
    return {data}
}
export const deleteReception = async (id: any) =>{
    const {data} = await $authHost.delete('api/receptions/delete?id='+id)
    return {data}
}

export const updateReception = async (id: number, date: string, time: string, clientId: number, doctorId: number, procedureId: number, note:string) => {
    const {data} = await $authHost.put('api/receptions/update?id=' + id, {date, time, clientId, doctorId, procedureId, note})
    return data
}
