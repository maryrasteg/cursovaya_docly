import React, {useContext, useEffect, useState} from "react";
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './Reception.module.css'
import {Route, useNavigate} from "react-router-dom";
import {RECEPTIONS_ROUTE} from "../../utils/consts";
import {getOneReception, deleteReception} from "../../http/receptionAPI";
import {useParams} from 'react-router-dom'
import {Context} from "../../index";
import {Notification} from "@arco-design/web-react";
import {Button, Form, Modal} from "react-bootstrap";


const Client = observer(() => {
    const {user} = useContext(Context)
    const navigate  = useNavigate()
    const [editMode, setEditMode] = useState(false);

    const {id} = useParams()

    //reception fields
    const [client, setClient] = useState({"first_name": "", "surname": "", "middle_name": ""})
    const [doctor, setDoctor] = useState({"first_name": "", "surname": "", "middle_name": ""})
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [procedure, setProcedure] = useState({"id": 0, "name": ""})
    const [note, setNote] = useState("")

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
            console.log(data)
        })

    }, [editMode])

    const toggleEditMode = () => {
        setEditMode(current => !current);
        if (editMode) {
            window.location.reload();
        }
    };

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
                        <Form className='d-flex flex-column rounded-3 mt-3 mb-3' style={{width: "100%"}} >
                            <Form.Label style={{textAlign:"left"}}>Дата приема</Form.Label>
                            <Form.Control value={date.split("-").reverse().join(".")} style={{height: 50, background: "#EDF3FC"}}  />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Время приема</Form.Label>
                            <Form.Control className="rounded-3" value={time} style={{height: 50, background: "#EDF3FC"}} />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Пациент</Form.Label>
                            <Form.Control className="rounded-3" value={client.surname + ' ' + client.first_name + ' ' + client.middle_name} style={{height: 50, background: "#EDF3FC"}} />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Врач</Form.Label>
                            <Form.Control className="rounded-3" value={doctor.surname + ' ' + doctor.first_name + ' ' + doctor.middle_name} style={{height: 50, background: "#EDF3FC"}}/>
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Процедура</Form.Label>
                            <Form.Control className="rounded-3" value={procedure.name} style={{height: 50, background: "#EDF3FC"}}/>
                            <Form.Label value={note} style={{textAlign:"left",  marginTop: 12}}>Заметка</Form.Label>
                            <Form.Control as="textarea" className="rounded-3" rows={3} value={note} style={{background: "#EDF3FC"}} />
                        </Form>
            </div>
        </>
    )
})

export default Client