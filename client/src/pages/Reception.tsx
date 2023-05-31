import React from 'react';
import s from "./Page.module.css";
import CurrentReception from "../components/Reception/Reception";

const Reception = () => {
    return (
        <div className={s.page_wrapper}>
            <CurrentReception />
        </div>
    )
}

export default Reception;