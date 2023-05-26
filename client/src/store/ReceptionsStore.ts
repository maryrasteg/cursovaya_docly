import { makeAutoObservable } from "mobx"

export default class ReceptionsStore{
    _receptions: any;
    constructor() {
        this._receptions = []
        makeAutoObservable(this)
    }
    setReceptions(receptions: any){
        this._receptions = receptions
    }

    get receptions(){
        return this._receptions
    }

}