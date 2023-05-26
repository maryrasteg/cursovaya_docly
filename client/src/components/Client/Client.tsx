import React, {useContext, useState} from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './Client.module.css'
import {Context} from "../../index";
import {Route, useNavigate} from "react-router-dom";
import {CLIENTS_ROUTE} from "../../utils/consts";
import {Form, Button, Dropdown} from "react-bootstrap";


const Client = observer(() => {
    const navigate  = useNavigate()
    const {client} = useContext(Context)
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(current => !current);
    };

    return(
        <div className={s.client_wrapper}>
            <div className={s.buttons_wrapper}>
                <Button className="rounded-3" style={{height: 50, marginTop: 22, width: 240}} variant={"outline-secondary"} onClick={() => {navigate(CLIENTS_ROUTE)}}>Назад</Button>
                <Button className="rounded-3 " style={{height: 50, marginTop: 22, paddingRight: 32, paddingLeft: 32}} variant={"outline-primary"} onClick={toggleEditMode}>{editMode ? "Отменить" : "Редактировать"}</Button>
            </div>
            {!editMode ? (
                <Form className='d-flex flex-column' style={{width: "100%", borderRadius: 12}}>
                    <Form.Label style={{textAlign:"left"}}>Фамилия</Form.Label>
                    <Form.Control placeholder={client.data.surname} value={client.data.surname} style={{height: 50}} readOnly/>
                    <Form.Label style={{textAlign:"left",  marginTop: 12}}>Имя</Form.Label>
                    <Form.Control placeholder={client.data.first_name} defaultValue={client.data.first_name} style={{height: 50}} readOnly />
                    <Form.Label style={{textAlign:"left",  marginTop: 12}}>Отчество</Form.Label>
                    <Form.Control placeholder={client.data.middle_name} defaultValue={client.data.middle_name} style={{height: 50}} readOnly />
                    <Form.Label style={{textAlign:"left",  marginTop: 12}}>Дата рождения</Form.Label>
                    <Form.Control placeholder={client.data.birth} defaultValue={client.data.birth} style={{height: 50}} readOnly />
                    <Form.Label style={{textAlign:"left",  marginTop: 12}}>Номер телефона</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant={"outline-secondary"}>Выберите что-то (будет пол)</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Hello</Dropdown.Item>
                            <Dropdown.Item>Bye</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control placeholder={client.data.phone} defaultValue={client.data.phone} style={{height: 50}} readOnly />
                </Form>)
                : (
                    <Form className='d-flex flex-column rounded-3' style={{width: "100%"}} >
                        <Form.Label style={{textAlign:"left"}}>Фамилия</Form.Label>
                        <Form.Control className="rounded-3" placeholder={client.data.surname} value={client.data.surname} style={{height: 50, background: "#EDF3FC"}} />
                        <Form.Label style={{textAlign:"left",  marginTop: 12}}>Имя</Form.Label>
                        <Form.Control className="rounded-3" placeholder={client.data.first_name} defaultValue={client.data.first_name} style={{height: 50, background: "#EDF3FC"}}  />
                        <Form.Label style={{textAlign:"left",  marginTop: 12}}>Отчество</Form.Label>
                        <Form.Control className="rounded-3" placeholder={client.data.middle_name} defaultValue={client.data.middle_name} style={{height: 50, background: "#EDF3FC"}}  />
                        <Form.Label style={{textAlign:"left",  marginTop: 12}}>Дата рождения</Form.Label>
                        <Form.Control className="rounded-3" placeholder={client.data.birth} defaultValue={client.data.birth} style={{height: 50, background: "#EDF3FC"}}  />
                        <Form.Label style={{textAlign:"left",  marginTop: 12}}>Номер телефона</Form.Label>
                        <Form.Control className="rounded-3" placeholder={client.data.phone} defaultValue={client.data.phone} style={{height: 50, background: "#EDF3FC"}}  />
                        <Button variant={"primary"} style={{height: 60, marginTop: 32}} className="rounded-3">Сохранить</Button>
                    </Form>)
            }

        </div>
    )
})

export default Client