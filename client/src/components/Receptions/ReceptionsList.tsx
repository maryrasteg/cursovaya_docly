import React, {useContext, useEffect, useState} from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './ReceptionsList.module.css'
import {Button, Dropdown, DropdownButton, Form, FormGroup, Modal} from "react-bootstrap";
import {DatePicker, Notification} from "@arco-design/web-react";
import enUS from '@arco-design/web-react/es/locale/en-US';
import "@arco-design/web-react/dist/css/arco.css";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {getAllReceptions} from "../../http/receptionsAPI";
import Pages from "../Pages/Pages";
import ReceptionRow from "./ReceptionRow/ReceptionRow";
import {getAllClients} from "../../http/clientsAPI";
import {createReception} from "../../http/receptionAPI";

const ReceptionsList = observer(() => {
    const {user} = useContext(Context)

    const navigate  = useNavigate()
    const {receptions} = useContext(Context)
    const [doctors, setDoctors] = useState([])
    const [procedures, setProcedures] = useState([])
    const [searchDoctor, setSearchDoctor] = useState(false)

    //new reception fields
    const [searchName, setSearchName] = useState("")
    const [client, setClient] = useState({"first_name": "", "surname": "", "middle_name": "", id: 0})
    const [doctor, setDoctor] = useState({"first_name": "", "surname": "", "middle_name": "", id: 0})
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [procedure, setProcedure] = useState({"name": "", "id": 0})
    const [note, setNote] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [isNewReception, setIsNewReception] = useState(false)

    //new reception modal
    const [show, setShow] = useState(false);
    const [searchDate, setSearchDate] = useState("")
    const [isSearchDate, setIsSearchDate] = useState(false)



    const handleClose = () => {
        setSearchName("")
        setClient({"first_name": "", "surname": "", "middle_name": "", "id": 0})
        setDoctor({"first_name": "", "surname": "", "middle_name": "", "id": 0})
        setDate("")
        setTime("")
        setProcedure({"name": "", "id": 0})
        setNote("")
        setShow(false)
        setSearchResult([])
    };

    const newReception = () => {
        if(client.surname && doctor.surname && procedure.name && date && time ){
            createReception(date, time, client.id, doctor.id, procedure.id, note).then((data: any) => {
                setIsNewReception(true)
            })
            handleClose()
            return( Notification.success({
                title: 'Сообщение',
                content: 'Прием создан успешно!',
            }))
        }
        else return( Notification.error({
            title: 'Ошибка',
            content: 'Заполните основные поля!',
        }))
    }
    const handleShow = () => setShow(true);



    useEffect(() => {
        getAllReceptions(receptions.page, 20, receptions.selectedDoctor, searchDate).then((data:any) => {
            receptions.setReceptions(data.data.receptions.rows)
            receptions.setTotalCount(data.data.receptions.count)
            setDoctors(data.data.doctors)
            setProcedures(data.data.procedures)
            setIsNewReception(false)
            setIsSearchDate(false)
        })
    }, [receptions.page, searchDoctor, isNewReception, isSearchDate])

    //client search

    useEffect(() => {
        if(searchName.length > 2) {
            const delayDebounceFn = setTimeout(() => {
                getAllClients(1, 100, searchName).then((data: any) => {
                    setSearchResult(data.data.rows)
                })
            }, 500)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [searchName])

    const setClientHandler = (client: any) => {
        setSearchResult([])
        setClient(client)
        setSearchName(client.surname + ' ' + client.first_name + ' ' + client.middle_name)
    }

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
                {user.isAdmin && <Button variant="outline-primary" style={{height: 46}} onClick={handleShow}>Новый приём</Button>}
                <Modal
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Новый приём</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className='d-flex flex-column rounded-3 mt-3 mb-3' style={{width: "100%"}} >
                            <Form.Label style={{textAlign:"left"}}>Дата приема</Form.Label>
                            <Form.Control className="rounded-3" placeholder='Дата приема' onChange={e => setDate(e.target.value)} style={{height: 42, background: "#EDF3FC"}} type={'date'}  />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Время приема</Form.Label>
                            <Form.Control className="rounded-3" placeholder='Время приема' onChange={e => setTime(e.target.value)} style={{height: 42, background: "#EDF3FC"}} type={'time'}  />
                            <>
                                <Form.Label style={{textAlign:"left",  marginTop: 12}}>Пациент</Form.Label>
                                <Form.Control className="rounded-3" placeholder={'Начните вводить фамилию'} value={searchName} onChange={e => setSearchName(e.target.value)} style={{height: 42, background: "#EDF3FC"}} />
                                <div className={(searchResult.length > 0 && searchName.length > 2) ? s.searchResultsList : s.invisible}>
                                    {
                                        searchResult.map((search: {surname: "", first_name: "", middle_name: ""}) => {
                                            return(
                                                <>
                                                    <a className={s.searchResult} onClick={() => setClientHandler(search)}>
                                                        <h2>{search.surname + ' ' + search.first_name + ' ' + search.middle_name}</h2>
                                                    </a>
                                                    <div className={s.divider}></div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </>

                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Врач</Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle className='d-flex w-100 justify-content-between align-items-center' style={{height: 42, background: "#EDF3FC", color: "#435875", border: "1px solid #D1D6E1"}}>{doctor.surname ? (doctor.surname + ' ' + doctor.first_name + ' ' + doctor.middle_name) : "Выберите врача"}</Dropdown.Toggle>
                                <Dropdown.Menu className='w-100'>
                                    {doctors.map((doctor: any) =>
                                        <Dropdown.Item
                                            key={doctor.id}
                                            onClick={() => setDoctor(doctor)}
                                        >
                                            {doctor.surname + ' ' + doctor.first_name[0] + '.' + doctor.middle_name[0] + '.'}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Процедура</Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle className='d-flex w-100 justify-content-between align-items-center' style={{height: 42, background: "#EDF3FC", color: "#435875", border: "1px solid #D1D6E1"}}>{procedure.name ? procedure.name : "Выберите процедуру"}</Dropdown.Toggle>
                                <Dropdown.Menu className='w-100' style={{maxHeight: 240, overflowY: "scroll"}}>
                                    {procedures.map((procedure: any) =>
                                        <Dropdown.Item
                                            key={procedure.id}
                                            onClick={() => setProcedure(procedure)}
                                            style={{wordBreak: "break-word", whiteSpace: "normal"}}
                                        >
                                            {procedure.name}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Заметка</Form.Label>
                            <Form.Control as="textarea" className="rounded-3" rows={3} value={note} onChange={(e) => setNote(e.target.value)} style={{background: "#EDF3FC"}} />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className='d-flex flex-row'>
                        <Button variant="primary" className='ps-4 pe-4 pb-3 pt-3 w-100' onClick={newReception}>
                            Создать
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className={s.buttonsGroup}>
                    <Dropdown style={{marginLeft: 22, height: 46}}>
                        <Dropdown.Toggle style={{height: 46}}>{receptions.selectedDoctor.surname ? (receptions.selectedDoctor.surname + ' ' + receptions.selectedDoctor.first_name + ' ' + receptions.selectedDoctor.middle_name) : "Выберите врача"}</Dropdown.Toggle>
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

                    <div className={s.input_and_button}>
                        <Form.Control placeholder={'Укажите дату'} style={{height: 42, background: "#EDF3FC", color: "#435875", border: "1px solid #D1D6E1", borderRadius: 8}} value={searchDate} onChange={(event) => setSearchDate(event.target.value)} type={'date'} />
                        <Button onClick={() => setIsSearchDate(true)}>OK</Button>
                    </div>
                </div>

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

export default ReceptionsList