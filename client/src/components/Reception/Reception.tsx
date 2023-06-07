import React, {useContext, useEffect, useState} from "react";
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './Reception.module.css'
import {Route, useNavigate} from "react-router-dom";
import {RECEPTIONS_ROUTE} from "../../utils/consts";
import {getOneReception, deleteReception, updateReception} from "../../http/receptionAPI";
import {useParams} from 'react-router-dom'
import {Context} from "../../index";
import {Notification} from "@arco-design/web-react";
import {Button, Dropdown, Form, FormGroup, Modal} from "react-bootstrap";
import {getAllClients} from "../../http/clientsAPI";
import {listProcedures} from "../../http/proceduresAPI";


const Client = observer(() => {
    const {user} = useContext(Context)
    const navigate  = useNavigate()
    const [editMode, setEditMode] = useState(false);

    const {id} = useParams()

    const [procedures, setProcedures] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchResult, setSearchResult] = useState([])

    //reception fields
    const [client, setClient] = useState({id: 0, "first_name": "", "surname": "", "middle_name": ""})
    const [doctor, setDoctor] = useState({id: 0, "first_name": "", "surname": "", "middle_name": ""})
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [procedure, setProcedure] = useState({"id": 0, "name": ""})
    const [note, setNote] = useState("")
    const [isUpdated, setIsUpdated] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {receptions} = useContext(Context)

    useEffect(() => {
        getOneReception(id).then((data: any) => {
            setClient(data.data.client)
            setDoctor(data.data.doctor)
            setDate(data.data.date)
            setTime(data.data.time)
            setNote(data.data.note)
            setProcedure(data.data.procedure)
            setSearchName(data.data.client.surname + ' ' + data.data.client.first_name + ' ' + data.data.client.middle_name)
            setIsUpdated(false)
            listProcedures(1, 100).then((data: any) => {
                setProcedures(data.data.rows)
            })
        }
        )
    }, [isUpdated])

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

    const toggleEditMode = () => {
        setEditMode(current => !current);
        if (editMode) {
            setIsUpdated(true)
        }
    };

    const setClientHandler = (client: any) => {
        setSearchResult([])
        setClient(client)
        setSearchName(client.surname + ' ' + client.first_name + ' ' + client.middle_name)
    }

    const delReception = async () => {
        try{
            await deleteReception(id)
            navigate(RECEPTIONS_ROUTE)
            return( Notification.success({
                title: 'Сообщение',
                content: 'Прием отменен успешно!',
            }))
        } catch(e) {
            alert(e)
        }
    }

    const updateReceptionHandler = () => {
        updateReception(Number(id), date, time, client.id, doctor.id, procedure.id, note ).then((data: any) => {
            toggleEditMode()
            return( Notification.success({
                title: 'Сообщение',
                content: data,
            }))
        })
    }

    const backHandler = () => {
        receptions.setPage(1)
        navigate(RECEPTIONS_ROUTE)
    }

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Отмена записи</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы дейсивтельно хотите отменить запись</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button variant="danger" onClick={delReception}>
                        Отменить
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className={s.client_wrapper}>
                <div className={s.buttons_wrapper}>
                    <Button className="rounded-3" style={{height: 50, marginTop: 22, width: 240}} variant={"outline-secondary"} onClick={backHandler}>Назад</Button>
                    <div className={s.buttons_together}>
                        {editMode && user.isAdmin && (<Button className="rounded-3 " style={{height: 50, paddingRight: 32, paddingLeft: 32, width: 200}}
                                                              variant={"outline-danger"}
                                                              onClick={handleShow}> Отменить прием</Button>)}
                        <Button className="rounded-3 " style={{height: 50,  marginTop: 22, paddingRight: 64, paddingLeft: 64, width: 340}}
                                 variant={"outline-primary"}
                                 onClick={toggleEditMode}>{editMode ? "Отменить" : "Редактировать"}</Button>
                    </div>
                </div>



                {!editMode ? (
                        <Form className='d-flex flex-column' style={{width: "100%", borderRadius: 12}}>
                            <Form.Label style={{textAlign:"left"}}>Дата приема</Form.Label>
                            <Form.Control value={date} style={{height: 50, background: "#EDF3FC"}} type={'date'} readOnly />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Время приема</Form.Label>
                            <Form.Control className="rounded-3" value={time} style={{height: 50, background: "#EDF3FC"}} type={'time'} readOnly />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Пациент</Form.Label>
                            <Form.Control className="rounded-3" value={client.surname + ' ' + client.first_name + ' ' + client.middle_name} style={{height: 50, background: "#EDF3FC"}}  readOnly />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Врач</Form.Label>
                            <Form.Control className="rounded-3" value={doctor.surname + ' ' + doctor.first_name + ' ' + doctor.middle_name} style={{height: 50, background: "#EDF3FC"}} readOnly />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Процедура</Form.Label>
                            <Form.Control className="rounded-3" value={procedure.name} style={{height: 50, background: "#EDF3FC"}} readOnly />
                            <Form.Label value={note} style={{textAlign:"left",  marginTop: 12}}>Заметка</Form.Label>
                            <Form.Control as="textarea" className="rounded-3" rows={3} value={note} style={{background: "#EDF3FC"}} readOnly />
                        </Form>)
                    : (
                        <Form className='d-flex flex-column rounded-3' style={{width: "100%"}} >
                            <Form.Label style={{textAlign:"left"}}>Дата приема</Form.Label>
                            {user.isAdmin ?
                                (<Form.Control value={date} onChange={e => setDate(e.target.value)} style={{height: 50, background: "#EDF3FC"}} type={'date'} />)
                                :
                                (<Form.Control value={date} onChange={e => setDate(e.target.value)} style={{height: 50, background: "#EDF3FC"}} type={'date'} readOnly />)
                            }
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Время приема</Form.Label>
                            {user.isAdmin ?
                                (<Form.Control className="rounded-3" value={time} onChange={e => setTime(e.target.value)} style={{height: 50, background: "#EDF3FC"}} type={'time'} />)
                                :
                                (<Form.Control className="rounded-3" value={time} onChange={e => setTime(e.target.value)} style={{height: 50, background: "#EDF3FC"}} type={'time'} readOnly />)
                            }
                            <div className={s.client_field_wrapper}>
                                <Form.Label style={{textAlign:"left",  marginTop: 12}}>Пациент</Form.Label>
                                {user.isAdmin ?
                                    (<>
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
                                    </>)
                                    :
                                    (<Form.Control className="rounded-3" value={searchName} style={{height: 42, background: "#EDF3FC"}} />)
                                }
                            </div>
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Врач</Form.Label>
                            <Form.Control className="rounded-3" value={doctor.surname + ' ' + doctor.first_name + ' ' + doctor.middle_name} style={{height: 50, background: "#EDF3FC"}} readOnly />
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
                            <Form.Label value={note} style={{textAlign:"left",  marginTop: 12}}>Заметка</Form.Label>
                            <Form.Control as="textarea" className="rounded-3" rows={3} value={note} onChange={e => setNote(e.target.value)} style={{background: "#EDF3FC"}} />
                            <Button variant={"primary"} style={{height: 60, marginTop: 32}} className="rounded-3" onClick={updateReceptionHandler}>Сохранить</Button>
                        </Form>)
                }
            </div>
        </>
    )
})

export default Client