import React, {useContext, useEffect, useState} from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './ReceptionsList.module.css'
import {Dropdown, DropdownButton, Pagination, Table} from "react-bootstrap";
import {Context} from "../../index";
import {authRoutes} from "../../routes";
import {Route, useNavigate} from "react-router-dom";
import {CLIENT_ROUTE, RECEPTION_ROUTE} from "../../utils/consts";
import {ReactComponent as SearchIcon} from "./assets/icon_search.svg";
import {getAllReceptions} from "../../http/receptionsAPI";
import Pages from "../Pages/Pages";
import {Moment} from "moment";
import ReceptionRow from "./ReceptionRow/ReceptionRow";

const Receptions = observer(() => {
    const navigate  = useNavigate()
    const {receptions} = useContext(Context)
    const [doctors, setDoctors] = useState([])
    const [searchDoctor, setSearchDoctor] = useState(false)

    useEffect(() => {
        getAllReceptions(receptions.page, 20, receptions.selectedDoctor).then((data:any) => {
            receptions.setReceptions(data.data.receptions.rows)
            receptions.setTotalCount(data.data.receptions.count)
            setDoctors(data.data.doctors)
        })
    }, [receptions.page, searchDoctor])

    let currentDate = new Date()
    const getStatus = (date: any, time: any, duration: number) => {
        let receptionDate = new Date(date + ' ' + time)
        if(currentDate<receptionDate){
            return('Ожидание клиента')
        } else {
            if(currentDate.toString().slice(0,16) == receptionDate.toString().slice(0,16)) {
                const mDiff = currentDate.getHours() * 60 + currentDate.getMinutes() - receptionDate.getHours() * 60 + receptionDate.getMinutes()
                if (mDiff < duration){
                    return ('Прием идет')
                }
                console.log(duration)
            }
            return ('Прием прошел')
        }
    }

    const chooseDoctor = (doctor: {}) => {
        setSearchDoctor(!searchDoctor)
        receptions.setSelectedDoctor(doctor)
    }

    return(
        <div className={s.table_buttons_wrapper}>
            <div className={s.buttonsWrapper}>
                <Dropdown>
                    <Dropdown.Toggle>{receptions.selectedDoctor.surname ? (receptions.selectedDoctor.surname + ' ' + receptions.selectedDoctor.first_name + ' ' + receptions.selectedDoctor.middle_name) : "Выберите врача"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            key={0}
                            onClick={() => chooseDoctor({})}
                        >
                            Отменить выбор
                        </Dropdown.Item>
                        {doctors.map((doctor: any) =>
                            <Dropdown.Item
                                key={doctor.id}
                                onClick={() => chooseDoctor(doctor)}
                            >
                                {doctor.surname + ' ' + doctor.first_name[0] + '.' + doctor.middle_name[0] + '.'}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className={s.table_wrapper}>
                <table>
                    <thead>
                        <tr style={{height: 60}} className={s.trh}>
                            <th style={{width: "26%"}} className={s.tdh}>Пациент</th>
                            <th style={{width: "16%"}} className={s.tdh}>Врач</th>
                            <th style={{width: "20%"}} className={s.tdh}>Процедура</th>
                            <th style={{width: "10%"}} className={s.tdh}>Дата</th>
                            <th style={{width: "10%"}} className={s.tdh}>Время</th>
                            <th style={{width: "100%"}} className={s.tdh}>Статус</th>

                        </tr>
                    </thead>
                </table>
                <SimpleBar className={s.table_content_wrapper}>
                    <table>

                        <tbody className={s.tb}>
                            {receptions.receptions.map((reception: any) =>
                                <ReceptionRow client_name={reception.client.surname + ' ' + reception.client.first_name + ' ' + reception.client.middle_name}
                                              doctor_name={reception.doctor.surname + ' ' + reception.doctor.first_name[0] + '.' + reception.doctor.middle_name[0] + '.'}
                                              procedure={reception.procedure.name}
                                              id={reception.id}
                                              date={(reception.date).split("-").reverse().join(".")}
                                              time={reception.time.toString().slice(0,5)}
                                              status={getStatus(reception.date, reception.time, reception.procedure.duration)} />
                            )}



                        </tbody>
                    </table>
                </SimpleBar>
                <Pages state={receptions}/>
            </div>
        </div>
    )
})

export default Receptions