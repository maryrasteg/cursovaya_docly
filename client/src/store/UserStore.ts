import { makeAutoObservable } from "mobx"

export default class UserStore{
    _isAuth: boolean;
    _isAdmin: boolean;
    _user: any;
    _login: string;
    constructor() {
        this._isAuth = true;
        this._user = {};
        this._isAdmin = false;
        this._login = "rastegaeva_mi";
        makeAutoObservable(this)
    }
    setIsAuth(bool: boolean){
        this._isAuth = bool
    }
    setIsAdmin(bool: boolean){
        this._isAdmin = bool
    }

    setLogin(login: string){
        this._login = login
    }

    setUser(user: any){
        this._user = user
    }

    get isAuth(){
        return this._isAuth
    }
    get isAdmin(){
        return this._isAdmin
    }
    get login(){
        return this._login
    }

    get user(){
        return this._user
    }
}