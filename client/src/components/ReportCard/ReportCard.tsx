import React, {useEffect, useState} from 'react';
import s from "./ReportCard.module.css";
import {getMonthReceptions} from "../../http/receptionsAPI";
const XLSX = require("xlsx")

interface ReportCardProps {
    active: boolean;
    action: string;
    name: string;
    icon: any;
}

const ReportCard = ({ action, name, icon, active }: ReportCardProps) => {

    const [list, setList] = useState([{}, {}])
    const clickHandler = async () => {
        await getMonthReceptions().then((data:any) => {
            let result = [{}]
            data.data.forEach((row: any) => {
                result.push({"Дата": row.date, "Время": row.time, "Врач": row.doctor.surname + ' ' + row.doctor.first_name + ' ' + row.doctor.middle_name, "Пациент": row.client.surname + ' ' + row.client.first_name + ' ' + row.client.middle_name, "Процедура": row.procedure.name})
            })

            let wb = XLSX.utils.book_new()
            let ws = XLSX.utils.json_to_sheet(result)
            const today = new Date()
            const name = "Приемы за месяц | " + today.toString().slice(4, 24)
            console.log(name)
            XLSX.utils.book_append_sheet(wb, ws, today.toString().slice(4, 15))
            XLSX.writeFile(wb, name+'.xlsx')


        })

    }

    return (
        <div className={active ? s.reportCard : s.reportCardinWork}
             onClick={clickHandler}>
            <div className={s.icon}>{icon}</div>
            {name}
        </div>
    )
}

export default ReportCard;