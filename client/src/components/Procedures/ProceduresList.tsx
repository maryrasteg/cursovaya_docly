import React, {useContext, useEffect, useState} from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './ProceduresList.module.css'
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import Pages from "../Pages/Pages";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Notification} from "@arco-design/web-react";
import {listProcedures, updateProcedure, createProcedure} from "../../http/proceduresAPI";

const ProceduresList = observer(() => {
    const navigate = useNavigate()
    const {procedures} = useContext(Context)

    //modal fields
    const [show, setShow] = useState(false);

    const [isAdd, setIsAdd] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const [procedureId, setProcedureId] = useState(0)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [duration, setDuration] = useState("")

    useEffect(() => {
        listProcedures(procedures.page, 20).then((data: any) => {
            procedures.setProcedures(data.data.rows)
            procedures.setTotalCount(data.data.count)
            setIsEdited(false)
        })
    }, [procedures.page, isEdited])

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setIsAdd(false)
        }, 300)
    }
    const handleShow = (procedure = {id: 0, name: "", price: 0, duration: 0}) => {
        setProcedureId(procedure.id)
        setName(procedure.name)
        setPrice((procedure.price).toString())
        setDuration((procedure.duration).toString())
        if(procedure.id == 0){
            setIsAdd(true)
            setPrice("")
            setDuration("")
        }
        setShow(true)
    };

    const updateProcedureHandler = async () => {
        await updateProcedure(procedureId, name, Number(price), Number(duration)).then(() => {
            setIsEdited(true)
            handleClose()
            return( Notification.success({
                title: 'Сообщение',
                content: 'Процедура успешно изменена!',

            }))
        })
    }

    const createProcedureHandler = async () => {
        await createProcedure(name, Number(price), Number(duration)).then(() => {
            setIsEdited(true)
            handleClose()
            return( Notification.success({
                title: 'Сообщение',
                content: 'Процедура успешно добавлена!',

            }))
        })
    }

    return (
        <>
            <Modal show={show}
                   onHide={handleClose}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{isAdd ? "Добавление процедуры" : "Редактирование пользователя"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label style={{textAlign:"left"}}>Название</Form.Label>
                    <Form.Control className="rounded-3" placeholder='Название' value={name} onChange={e => setName(e.target.value)} style={{height: 42, background: "#EDF3FC"}}  />
                    <Form.Label style={{textAlign:"left",  marginTop: 12}}>Стоимость</Form.Label>
                    <Form.Control className="rounded-3" placeholder='Стоимость' value={price} onChange={e => setPrice(e.target.value)} style={{height: 42, background: "#EDF3FC"}} />
                    <Form.Label style={{textAlign:"left",  marginTop: 12}}>Длительность (минуты)</Form.Label>
                    <Form.Control className="rounded-3" placeholder='Длительность' value={duration} onChange={e => setDuration(e.target.value)} style={{height: 42, background: "#EDF3FC"}} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='ps-4 pe-4 pb-3 pt-3 w-100' onClick={isAdd ? createProcedureHandler : updateProcedureHandler}>
                        {isAdd ? "Добавить" : "Сохранить"}
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={s.table_buttons_wrapper}>
                <Button variant="outline-primary" onClick={() => handleShow()}>Добавить процедуру</Button>
                <div className={s.table_wrapper}>
                    <table>
                        <thead>
                        <tr style={{height: 60}} className={s.trh}>
                            <th style={{width: "20%"}} className={s.tdh}>Название</th>
                            <th style={{width: "10%"}} className={s.tdh}>Стоимость</th>
                            <th style={{width: "20%"}} className={s.tdh}>Длительность</th>
                        </tr>
                        </thead>
                    </table>
                    <SimpleBar className={s.table_content_wrapper}>
                        <table>
                            <tbody className={s.tb}>
                            {procedures.procedures.map((procedure: any) =>
                                <tr className={s.trb} onClick={() => handleShow(procedure)}>
                                    <td style={{width: "20%"}} className={s.tdb}>{procedure.name}</td>
                                    <td style={{width: "10%"}} className={s.tdb}>{procedure.price}</td>
                                    <td style={{width: "20%"}} className={s.tdb}>{Math.floor(procedure.duration / 60) + "ч " + procedure.duration % 60 + "м"}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </SimpleBar>
                    <Pages state={procedures}/>
                </div>
            </div>
        </>
    )
})

export default ProceduresList