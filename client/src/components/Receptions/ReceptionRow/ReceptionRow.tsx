import s from "./ReceptionRow.module.css";
import {RECEPTION_ROUTE} from "../../../utils/consts";
import React from "react";
import {useNavigate} from "react-router-dom";
interface ReceptionRowProps {
    client_name: string;
    doctor_name: string;
    procedure: string;
    id: number;
    date: string;
    time: string;
    status: string;

}
const ReceptionRow = ({ id, client_name, doctor_name, procedure, date, time, status }: ReceptionRowProps) => {
    const navigate  = useNavigate()
    return(
        <tr className={(status == 'Прием идет') ? `${s.trb} ${s.active}` : s.trb} onClick={() => navigate(RECEPTION_ROUTE + '/' + id)}>
            <td style={{width: "26%"}} className={s.tdb}>{client_name}</td>
            <td style={{width: "16%"}} className={s.tdb}>{doctor_name}</td>
            <td style={{width: "20%"}} className={s.tdb}>{procedure}</td>
            <td style={{width: "10%"}} className={s.tdb}>{date}</td>
            <td style={{width: "10%"}} className={s.tdb}>{time}</td>
            <td style={{width: "100%"}} className={s.tdb}>{status}</td>
        </tr>
    )
}

export default ReceptionRow