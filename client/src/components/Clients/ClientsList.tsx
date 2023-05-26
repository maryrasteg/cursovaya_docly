import React, {useContext} from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './ClientsList.module.css'
import {Pagination, Table} from "react-bootstrap";
import {Context} from "../../index";
import {authRoutes} from "../../routes";
import {Route, useNavigate} from "react-router-dom";
import {CLIENT_ROUTE} from "../../utils/consts";

const ClientsList = observer(() => {
    const navigate  = useNavigate()
    const {clients} = useContext(Context)
    return(
        <div className={s.table_wrapper}>
            <table>
                <thead>
                    <tr style={{height: 60}} className={s.trh}>
                        <th style={{width: "15%"}} className={s.tdh}>Фамилия</th>
                        <th style={{width: "15%"}} className={s.tdh}>Имя</th>
                        <th style={{width: "20%"}} className={s.tdh}>Отчество</th>
                        <th style={{width: "10%"}} className={s.tdh}>Дата рождения</th>
                        <th style={{width: "20%"}} className={s.tdh}>Номер телефона</th>

                    </tr>
                </thead>
            </table>
            <SimpleBar className={s.table_content_wrapper}>
                <table>
                    <tbody className={s.tb}>
                        {clients.clients.map((client: any) =>
                            <tr className={s.trb} onClick={() => navigate(CLIENT_ROUTE + '/' + client.id)}>
                                <td style={{width: "15%", wordBreak: "break-word"}} className={s.tdb}>{client.surname}</td>
                                <td style={{width: "15%"}} className={s.tdb}>{client.first_name}</td>
                                <td style={{width: "20"}} className={s.tdb}>{client.middle_name}</td>
                                <td style={{width: "10%"}} className={s.tdb}>{client.birth}</td>
                                <td style={{width: "20%"}} className={s.tdb}>{client.phone}</td>
                            </tr>
                        )}



                    </tbody>
                </table>
            </SimpleBar>
    </div>
    )
})

export default ClientsList