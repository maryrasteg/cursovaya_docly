import { makeAutoObservable } from "mobx"

export default class ReceptionStore{
    _reception: any;
    _note: any;
    _client: any;
    constructor() {
        this._reception = {}
        this._note = {}
        this._client = {}
        makeAutoObservable(this)
    }
    setReception(receptions: any){
        this._reception = receptions
    }
    setNote(note: any){
        this._note = note
    }
    setClient(client: any){
        this._client = client
    }

    get reception(){
        return this._reception
    }
    get note(){
        return this._note
    }
    get client(){
        return this._client
    }

}