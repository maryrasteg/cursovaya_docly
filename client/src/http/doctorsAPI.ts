import {$authHost, $host} from "./index";

export const listDoctors = async (page=1, limit=20) =>{
    const {data} = await $authHost.get('api/doctors/list', {params: {
            page, limit
        }})
    return {data}
}
export const updateDoctor = async (id: number, surname: string, first_name: string, middle_name: string, birth: string, phone: string) => {
    const {data} = await $authHost.put('api/doctors/edit?id=' + id, {surname, first_name, middle_name, birth, phone})
    return {data}
}
export const createDoctor = async (surname: string, first_name: string, middle_name: string, positionId: number, birth: string, phone: string) => {
    const {data} = await $authHost.post('api/doctors/add', {surname, first_name, middle_name, positionId, birth, phone})
    return {data}
}
export const deleteDoctor = async (id: number) =>{
    const {data} = await $authHost.delete('api/doctors/delete?id='+id)
    return {data}
}

