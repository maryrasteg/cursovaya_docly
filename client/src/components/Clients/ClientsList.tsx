import React, {useContext, useEffect, useState} from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './ClientsList.module.css'
import {Button, Dropdown, Form, FormGroup, Modal, Pagination, Table} from "react-bootstrap";
import {Context} from "../../index";
import {authRoutes} from "../../routes";
import {Route, useNavigate} from "react-router-dom";
import {CLIENT_ROUTE} from "../../utils/consts";
import {ReactComponent as SearchIcon} from "./assets/icon_search.svg";
import {getAllClients} from "../../http/clientsAPI";
import Pages from "../Pages/Pages";
import {createClient} from "../../http/clientAPI";
import { Notification } from '@arco-design/web-react';

const ClientsList = observer(() => {
    const navigate  = useNavigate()
    const {clients} = useContext(Context)
    const [searchName, setSearchName] = useState("")

    //modal fields

    const {user} = useContext(Context)

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setSurname("")
        setFirst_name("")
        setMiddle_name("")
        setBirth("")
        setPhone("")
        setGender(0)
        setShow(false)
    };
    const handleShow = () => setShow(true);

    //new user fields

    const [surname, setSurname] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [middle_name, setMiddle_name] = useState("")
    const [gender, setGender] = useState(0)
    const [birth, setBirth] = useState("")
    const [phone, setPhone] = useState("")

    //for page uploading

    useEffect(() => {
        getAllClients(clients.page, 20, searchName).then((data:any) => {
            clients.setClients(data.data.rows)
            clients.setTotalCount(data.data.count)
        })
    }, [clients.page])

    //for search by name (width delay) -> If typing stops for 500ms -> A search query is sent

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            clients.setPage(1)
            getAllClients(clients.page, 20, searchName).then((data:any) => {
                clients.setClients(data.data.rows)
                clients.setTotalCount(data.data.count)
            })
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchName])

    const addClient = () => {
        if(surname != "" && first_name != ""){
            createClient(surname, first_name, middle_name, gender, birth, phone).then((data: any) => {
                console.log(data)
            })
            handleClose()
            return( Notification.success({
                title: 'Сообщение',
                content: 'Пользователь добавлен успешно!',
            }))
        }
        else alert("Недостаточно данных: фамилия или имя не могут быть пустыми")
    }


    return(
        <div className={s.table_buttons_wrapper}>
            <div className={s.buttonsWrapper}>
                {user.isAdmin && <Button className='p-3 pe-5 ps-5 rounded-3' variant='outline-primary' onClick={handleShow}>Новый пациент</Button>}
                <Modal
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Добавление пациента</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form className='d-flex flex-column rounded-3 mt-3 mb-3' style={{width: "100%"}} >
                            <Form.Label style={{textAlign:"left"}}>Фамилия</Form.Label>
                            <Form.Control className="rounded-3" placeholder={'Фамилия'} value={surname} onChange={e => setSurname(e.target.value)} style={{height: 50, background: "#EDF3FC"}} />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Имя</Form.Label>
                            <Form.Control className="rounded-3" placeholder={'Имя'} defaultValue={first_name} onChange={e => setFirst_name(e.target.value)} style={{height: 50, background: "#EDF3FC"}}  />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Отчество</Form.Label>
                            <Form.Control className="rounded-3" placeholder={'Отчетство'} defaultValue={middle_name} onChange={e => setMiddle_name(e.target.value)} style={{height: 50, background: "#EDF3FC"}}  />
                            <Form.Label style={{textAlign:"left",  marginTop: 12}}>Пол</Form.Label>
                            <Dropdown>
                        <Dropdown.Toggle
                            className='d-flex w-100 justify-content-between align-items-center'
                            style={{height: 42, background: "#EDF3FC", color: "#435875", border: "1px solid #D1D6E1"}}>{gender == 2 ? "Мужской" : gender == 1 ? "Женский" : "Выберите пол"}</Dropdown.Toggle>
                                    <Dropdown.Menu className='w-100'>
                                        <Dropdown.Item onClick={() => setGender(2)}>Мужской</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setGender(1)}>Женский</Dropdown.Item>
                                    </Dropdown.Menu>
                            </Dropdown>


                            <FormGroup className='d-flex flex-row rounded-3 gap-3'>
                                <FormGroup className='d-flex flex-column w-100'>
                                    <Form.Label style={{textAlign:"left",  marginTop: 12}}>Дата рождения</Form.Label>
                                    <Form.Control className="rounded-3" placeholder={birth} defaultValue={birth} onChange={e => setBirth(e.target.value)} style={{height: 50, background: "#EDF3FC"}} type={'date'}  />
                                </FormGroup>
                                <FormGroup className='d-flex flex-column w-100'>
                                    <Form.Label style={{textAlign:"left",  marginTop: 12}}>Номер телефона</Form.Label>
                                    <Form.Control className="rounded-3" placeholder={'Номер телефона'} defaultValue={phone} onChange={e => setPhone(e.target.value)} style={{height: 50, background: "#EDF3FC"}}  />
                                </FormGroup>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className='d-flex flex-row'>
                        <Button variant="primary" className='ps-4 pe-4 pb-3 pt-3 w-100' onClick={addClient}>
                            Создать
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className={s.table_wrapper}>
                <div className={s.custom_input_search}>
                    <SearchIcon />
                    <input type="text" name="field-search" placeholder="Поиск" value={searchName} onChange={(e) => setSearchName(e.target.value)}></input>
                </div>
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
                            {clients.clients.map((client: any) =>
                                <tr className={s.trb} onClick={() => navigate(CLIENT_ROUTE + '/' + client.id)}>
                                    <td style={{width: "10%"}} className={s.tdb}>{client.surname}</td>
                                    <td style={{width: "10%"}} className={s.tdb}>{client.first_name}</td>
                                    <td style={{width: "20%"}} className={s.tdb}>{client.middle_name}</td>
                                    <td style={{width: "10%"}} className={s.tdb}>{client.birth && (client.birth).split("-").reverse().join(".")}</td>
                                    <td style={{width: "20%"}} className={s.tdb}>{client.phone}</td>
                                </tr>
                            )}



                        </tbody>
                    </table>
                </SimpleBar>
                <Pages state={clients}/>
            </div>
        </div>
    )
})

export default ClientsList