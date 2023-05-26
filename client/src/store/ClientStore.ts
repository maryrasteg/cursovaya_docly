import { makeAutoObservable } from "mobx"

export default class ClientStore{
    _data: any;
    _receptions: any;
    constructor() {
        this._data = {id: 1, first_name: 'Владислав', surname: "Растегаев", middle_name: "Алексеевич", birth: '17.09.2004', phone: '+79127864632'}
        this._receptions = []

        makeAutoObservable(this)
    }
    setData(data: any){
        this._data = data
    }
    setReceptions(receptions: any){
        this._receptions = receptions
    }
    get data(){
        return this._data
    }
    get receptions(){
        return this._receptions
    }
}