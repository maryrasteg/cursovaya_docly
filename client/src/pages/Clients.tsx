import React from 'react';
import s from './Page.module.css'
import ClientsList from "../components/Clients/ClientsList";

const Clients = () => {
    return (
        <div className={s.page_wrapper}>
            <ClientsList />
        </div>
    )
}

export default Clients;