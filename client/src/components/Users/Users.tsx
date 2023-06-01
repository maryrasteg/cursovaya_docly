import React, {useContext, useEffect, useState} from "react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {observer} from "mobx-react-lite";
import s from './Users.module.css'
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import Pages from "../Pages/Pages";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {listUsers, updateUser} from "../../http/userAPI";
import {Notification} from "@arco-design/web-react";

const Users = observer(() => {
    const navigate = useNavigate()
    const {users} = useContext(Context)

    //modal fields
    const [show, setShow] = useState(false);

    const [userId, setUserId] = useState(0)
    const [login, setLogin] = useState("")
    const [role, setRole] = useState("")

    //login validation
    const [loginDirty, setLoginDirty] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [formValid, setFormValid] = useState(true)

    useEffect(()=>{
        if (loginError ) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }

    }, [loginError])

    useEffect(() => {
        listUsers(users.page, 20).then((data: any) => {
            users.setUsers(data.data.rows)
            users.setTotalCount(data.data.count)
        })
    }, [users.page, show])

    //show modal control
    const handleClose = () => { setShow(false) }
    const handleShow = (user: any) => {
        setUserId(user.id)
        setRole(user.role)
        setLogin(user.login)
        setShow(true)
    };
    const loginHandler = (e: string) => {
        setLogin(e)
        const re = /^[a-zA-Z0-9_\.]+$/
        if(!re.test(String(e).toLowerCase())){
            setLoginError('Некорректный логин')
            if(!e) {
                setLoginError('Логин не может быть пустым')
            }

        }else {
            setLoginError('')
        }
    }

    const updateUserHandler = async () => {
        await updateUser(userId, login, role)
        handleClose()
        return( Notification.success({
            title: 'Сообщение',
            content: 'Пользователь успешно изменен!',
        }))
    }

    return (
        <>
            <Modal show={show}
                   onHide={handleClose}
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование пользователя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label style={{textAlign:"left"}}>Логин</Form.Label>
                    <Form.Control onBlur={() => setLoginDirty(true)} className="rounded-3" placeholder='Логин' value={login} onChange={e => loginHandler(e.target.value)} style={{height: 42, background: "#EDF3FC"}}  />
                    {(loginDirty && loginError) && <div className='text-bg-danger bg-opacity-50 text-lg-start p-1 mt-1 rounded-1'>{loginError}</div>}
                    <Form.Label style={{textAlign:"left",  marginTop: 12}}>Роль</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle
                            className='d-flex w-100 justify-content-between align-items-center'
                            style={{height: 42, background: "#EDF3FC", color: "#435875", border: "1px solid #D1D6E1"}}
                        >
                            {role == 'USER' ? "Врач" : role == 'ADMINISTRATOR' ? "Администратор" : "Ожидание"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='w-100'>
                            <Dropdown.Item onClick={() => setRole("WAITER")}>Ожидание</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRole("USER")}>Врач</Dropdown.Item>
                            <Dropdown.Item onClick={() => setRole("ADMINISTRATOR")}>Администратор</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='ps-4 pe-4 pb-3 pt-3 w-100' onClick={updateUserHandler} disabled={!formValid}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={s.table_wrapper}>
                <table>
                    <thead>
                    <tr style={{height: 60}} className={s.trh}>
                        <th style={{width: "10%"}} className={s.tdh}>Логин</th>
                        <th style={{width: "10%"}} className={s.tdh}>Роль</th>
                    </tr>
                    </thead>
                </table>
                <SimpleBar className={s.table_content_wrapper}>
                    <table>
                        <tbody className={s.tb}>
                        {users.users.map((user: any) =>
                            <tr className={s.trb} onClick={() => handleShow(user)}>
                                <td style={{width: "10%"}} className={s.tdb}>{user.login}</td>
                                <td style={{width: "10%"}} className={s.tdb}>{user.role == 'USER' ? "Врач" : user.role == 'ADMINISTRATOR' ? "Администратор" : "Ожидание"}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </SimpleBar>
                <Pages state={users}/>
            </div>
        </>
    )
})

export default Users