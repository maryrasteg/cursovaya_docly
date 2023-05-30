import React from 'react';
import ReceptionsList from "../components/Receptions/Receptions";
import s from "./Page.module.css";

const Receptions = () => {
    return (
        <div className={s.page_wrapper}>
            <ReceptionsList />
        </div>
    )
}

export default Receptions;