import { makeAutoObservable } from "mobx"

export default class UserStore{
    _isAuth: boolean;
    _isAdmin: boolean;

    _isWaiter: boolean;
    _user: any;
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._isAdmin = false;
        this._isWaiter = false;
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean){
        this._isAuth = bool
    }
    setIsAdmin(bool: boolean){
        this._isAdmin = bool
    }

    setUser(user: any){
        this._user = user
    }

    setIsWaiter(bool: boolean){
        this._isWaiter = bool
    }

    setRoles(role: string){
        if (role === 'USER') {
            this._isAuth = true
            this._isAdmin = false
            this._isWaiter = false
        } else if (role === 'ADMINISTRATOR') {
            this._isAuth = true
            this._isAdmin = true
            this._isWaiter = false
        } else if (role === 'WAITER') {
            this._isAuth = false
            this._isAdmin = false
            this._isWaiter = true
        }
    }

    get isAuth(){
        return this._isAuth
    }
    get isAdmin(){
        return this._isAdmin
    }

    get isWaiter(){
        return this._isWaiter
    }

    get user(){
        return this._user
    }
}