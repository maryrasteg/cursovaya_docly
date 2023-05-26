import React from 'react';
import s from "./Page.module.css";
import Client from "../components/Client/Client";

const ClientPage = () => {
    return (
        <div className={s.page_wrapper}>
            <Client />
        </div>
    )
}

export default ClientPage;