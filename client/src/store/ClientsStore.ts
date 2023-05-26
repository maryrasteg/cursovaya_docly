import { makeAutoObservable } from "mobx"

export default class ClientsStore{
    _clients: any;
    constructor() {
        this._clients = []

        makeAutoObservable(this)
    }
    setClients(clients: any){
        this._clients = clients
    }
    get clients(){
        return this._clients
    }
}