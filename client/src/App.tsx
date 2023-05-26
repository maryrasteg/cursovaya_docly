import React, {useContext} from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from "./components/Navbar/Navbar";
import s from "./App.module.css"
import {Context} from "./index";

function App() {
    const {user} = useContext(Context)
    return (
        <div className={s.app_wrapper}>
            <BrowserRouter>
                {user.isAuth && (<Navbar />)}
                    <AppRouter />
            </BrowserRouter>
        </div>
    )
}


export default App;
