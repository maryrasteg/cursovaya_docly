import { makeAutoObservable } from "mobx"

export default class ClientsStore{
    _clients: any;
    constructor() {
        this._clients = [
            {id: 1, first_name: 'Владислав', surname: "Растегаев", middle_name: "Алексеевич", birth: '17.09.2004', phone: '+79127864632'},
            {id: 2, first_name: 'Мария', surname: "Растегаева", middle_name: "Игоревна", birth: '01.11.2002', phone: "+79504507492"}
        ]

        makeAutoObservable(this)
    }
    setClients(clients: any){
        this._clients = clients
    }
    get clients(){
        return this._clients
    }
}