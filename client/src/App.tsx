import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from "./components/Navbar/Navbar";
import s from "./App.module.css"
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import {CLIENTS_ROUTE} from "./utils/consts";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setRoles(user.user.role)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        console.log('loading')
        return (<div style={{width: "100vw", height: "100vh", display: "flex",alignItems: "center", justifyContent: "center"}}><Spinner animation={"grow"} variant="primary"/></div>)
    }

    return (
        <div className={s.app_wrapper}>
            <BrowserRouter>
                {user.isAuth && (<Navbar />)}
                    <AppRouter />
            </BrowserRouter>
        </div>
    )
})


export default App;
