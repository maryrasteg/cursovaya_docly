import {$authHost} from "./index";

export const listProcedures = async (page=1, limit=10) =>{
    const {data} = await $authHost.get('api/procedures/', {params: {
            page, limit
        }})
    return {data}
}

export const updateProcedure = async (id: number, name: string, price: number, duration: number) => {
    const {data} = await $authHost.put('api/procedures/update?id=' + id, {name, price, duration})
    return "Procedure successfully updated!"
}



export const createProcedure = async (name: string, price: number, duration: number) => {
    const {data} = await $authHost.post('api/procedures/add',{name, price, duration})
    return "Procedure successfully added!"
}

export const deleteProcedure = async (id: number) => {
    const {data} = await $authHost.delete('api/procedures/delete?id=' + id)
    return {data}
}