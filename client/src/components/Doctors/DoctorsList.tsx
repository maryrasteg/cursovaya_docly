import React, {useContext, useEffect, useState} from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './DoctorsList.module.css'
import {Context} from "../../index";
import Pages from "../Pages/Pages";
import {listDoctors} from "../../http/doctorsAPI";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {updateDoctor, deleteDoctor, createDoctor} from "../../http/doctorsAPI";
import {Notification} from "@arco-design/web-react";

const DoctorsList = observer(() => {
    const {doctors} = useContext(Context)

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [doctorId, setDoctorId] = useState(0)
    const [surname, setSurname] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [middle_name, setMiddle_name] = useState("")
    const [positionId, setPositionId] = useState(0)
    const [positionName, setPositionName] = useState("")
    const [birth, setBirth] = useState("")
    const [phone, setPhone] = useState("")
    const [isAdd, setIsAdd] = useState(false)
    const [isDoctorEdited, setIsDoctorEdited] = useState(false)

    const positionNameHandler = (id: number) => {
        switch (id){
            case 0:
                setPositionName("")
                break;
            case 1:
                setPositionId(id)
                setPositionName("Мануальный терапевт")
                break;
            case 2:
                setPositionId(id)
                setPositionName("Остеопат")
                break;
            case 3:
                setPositionId(id)
                setPositionName("Хирург")
                break;
            case 4:
                setPositionId(id)
                setPositionName("Педиатр")
                break;
        }
    }

    useEffect(() => {
        listDoctors(doctors.page, 20).then((data: any) => {
            doctors.setDoctors(data.data.rows)
            doctors.setTotalCount(data.data.count)
            setIsDoctorEdited(false)
        })
    }, [doctors.page, isDoctorEdited])

    const handleClose = () => {
        setShow(false)
        setTimeout(() => {
            setIsAdd(false)
        }, 300)
    }

    const handleShow = (doctor = {id: 0, surname: "", first_name: "", middle_name: "", birth: "", phone: "", positionId: 0}) => {
        if(doctor.id == 0){
            console.log(doctor.id)
            setIsAdd(true)
        }
        setDoctorId(doctor.id)
        setSurname(doctor.surname)
        setFirst_name(doctor.first_name)
        setMiddle_name(doctor.middle_name)
        setBirth(doctor.birth)
        setPhone(doctor.phone)
        setPositionId(doctor.positionId)
        positionNameHandler(doctor.positionId)
        setShow(true)
    };

    const doctorUpdateHandler = async () => {
        try{
            await updateDoctor(doctorId, surname, first_name, middle_name, birth, phone).then(() => {
                setIsDoctorEdited(true)
                handleClose()
                return( Notification.success({
                    title: 'Сообщение',
                    content: 'Врач успешно изменен!',
                }))
            })
        } catch(e) {
            alert(e)
        }
    }

    const doctorDeleteHandler = async () => {
        try{
            await deleteDoctor(doctorId).then(() => {
                setIsDoctorEdited(true)
                setShowDelete(false)
                handleClose()
                return( Notification.info({
                    title: 'Удаление',
                    content: 'Врач успешно удален!',
                }))
            })
        } catch(e) {
            alert(e)
        }
    }

    const doctorCreateHandler = async () => {
        if(surname && first_name && middle_name && birth){
            try{
                    await createDoctor(surname, first_name, middle_name, positionId, birth, phone).then(() => {
                        setIsDoctorEdited(true)
                        handleClose()
                        setIsAdd(false)
                        return( Notification.success({
                            title: 'Сообщение',
                            content: 'Врач успешно добавлен!',
                        }))
                    })
            } catch(e: any) {
                return( Notification.error({
                    title: 'Ошибка',
                    content: e.message,
                }))
            }
        } else {
            return( Notification.error({
                title: 'Ошибка',
                content: 'Заполните все обязательные поля!',
            }))
        }
    }


    return (
        <>
            <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтверждение удаления</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы дейсивтельно хотите удалить врача: {surname} {first_name} {middle_name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowDelete(false)}>
                        Отменить
                    </Button>
                    <Button variant="danger" onClick={doctorDeleteHandler}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show}
                   onHide={handleClose}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{isAdd ? "Добавление врача" : "Редактирование врача"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!isAdd && (<div className='w-100 d-flex flex-row justify-content-end'>
                        <Button variant={'outline-danger'} onClick={() => setShowDelete(true)}>Удалить врача</Button>
                    </div>)}
                    <Form.Label style={{textAlign:"left"}}>Фамилия</Form.Label>
                    <Form.Control className="rounded-3" placeholder='Фамилия' value={surname} onChange={event => setSurname(event.target.value)} style={{height: 42, background: "#EDF3FC"}}  />
                    <Form.Label style={{textAlign:"left"}}>Имя</Form.Label>
                    <Form.Control className="rounded-3" placeholder='Имя' value={first_name} onChange={event => setFirst_name(event.target.value)} style={{height: 42, background: "#EDF3FC"}}  />
                    <Form.Label style={{textAlign:"left"}}>Отчество</Form.Label>
                    <Form.Control className="rounded-3" placeholder='Отчество' value={middle_name} onChange={event => setMiddle_name(event.target.value)} style={{height: 42, background: "#EDF3FC"}}  />
                    <Form.Label style={{textAlign:"left"}}>Специальность</Form.Label>
                    <Dropdown>
                                <Dropdown.Toggle className='d-flex w-100 justify-content-between align-items-center' style={{height: 42, background: "#EDF3FC", color: "#435875", border: "1px solid #D1D6E1"}}>{positionName || "Выберите специальность"}</Dropdown.Toggle>
                                <Dropdown.Menu className='w-100'>
                                        <Dropdown.Item key={1} onClick={() => positionNameHandler(1)}>
                                            Мануальный терапевт
                                        </Dropdown.Item>
                                        <Dropdown.Item key={1} onClick={() => positionNameHandler(2)}>
                                            Остеопат
                                        </Dropdown.Item>
                                        <Dropdown.Item key={1} onClick={() => positionNameHandler(3)}>
                                            Хирург
                                        </Dropdown.Item>
                                        <Dropdown.Item key={1} onClick={() => positionNameHandler(4)}>
                                            Педиатр
                                        </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    <Form.Label style={{textAlign:"left"}}>Дата рождения</Form.Label>
                    <Form.Control className="rounded-3" placeholder='Дата рождения' value={birth} onChange={event => setBirth(event.target.value)} style={{height: 42, background: "#EDF3FC"}} type={"date"} />
                    <Form.Label style={{textAlign:"left"}}>Номер телефона</Form.Label>
                    <Form.Control className="rounded-3" placeholder='Номер телефона' value={phone} onChange={event => setPhone(event.target.value)} style={{height: 42, background: "#EDF3FC"}} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='ps-4 pe-4 pb-3 pt-3 w-100' onClick={isAdd ? doctorCreateHandler : doctorUpdateHandler}>
                        {isAdd ? "Добавить" : "Сохранить"}
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={s.table_buttons_wrapper}>
                <Button variant="outline-primary" onClick={() => handleShow()}>Добавить врача</Button>
                <div className={s.table_wrapper}>
                    <table>
                        <thead>
                        <tr style={{height: 60}} className={s.trh}>
                            <th style={{width: "10%"}} className={s.tdh}>Фамилия</th>
                            <th style={{width: "10%"}} className={s.tdh}>Имя</th>
                            <th style={{width: "20%"}} className={s.tdh}>Отчество</th>
                            <th style={{width: "10%"}} className={s.tdh}>Дата рождения</th>
                            <th style={{width: "20%"}} className={s.tdh}>Номер телефона</th>
                        </tr>
                        </thead>
                    </table>
                    <SimpleBar className={s.table_content_wrapper}>
                        <table>
                            <tbody className={s.tb}>
                            {doctors.doctors.map((doctor: any) =>
                                <tr className={s.trb} onClick={() => handleShow(doctor)}>
                                    <td style={{width: "10%"}} className={s.tdb}>{doctor.surname}</td>
                                    <td style={{width: "10%"}} className={s.tdb}>{doctor.first_name}</td>
                                    <td style={{width: "20%"}} className={s.tdb}>{doctor.middle_name}</td>
                                    <td style={{width: "10%"}}
                                        className={s.tdb}>{doctor.birth && (doctor.birth).split("-").reverse().join(".")}</td>
                                    <td style={{width: "20%"}} className={s.tdb}>{doctor.phone}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </SimpleBar>
                    <Pages state={doctors}/>
                </div>
            </div>
        </>
    )
})

export default DoctorsList