import React, {useContext, useEffect, useState} from 'react';
import {Container, Form, Card, Button, Modal} from "react-bootstrap";
import {Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import {CLIENTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {signIn, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import s from "./Page.module.css";
import {motion} from "framer-motion";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [loginDirty, setLoginDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [formValid, setFormValid] = useState(true)
    const [error, setError] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate  = useNavigate()

    useEffect(()=>{
        if (loginError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }

    }, [loginError, passwordError])

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await signIn(login, password)
                user.setUser(data)
                user.setRoles(user.user.role)
                if (user.isAuth) {
                    navigate(CLIENTS_ROUTE)
                }
                if (user.user.role == "WAITER"){
                    handleShow()
                }
            } else {
                data = await registration(login, password)
                user.setUser(data)
                user.setIsAuth(false)
                user.setIsAdmin(false)
                user.setIsWaiter(true)
                handleShow()
                setError("")
            }
        } catch (e: any) {
            setError(e.response.data.message)
        }

    }

    const loginHandler = (e: any) => {
        setLogin(e.target.value)
        if (!isLogin) {
            const re = /^[a-zA-Z0-9_\.]+$/
            if(!re.test(String(e.target.value).toLowerCase())){
                setLoginError('Некорректный логин')
                if(!e.target.value) {
                    setLoginError('Логин не может быть пустым')
                }

            }else {
                setLoginError('')
            }
        } else {
                setLoginError('')
            }
    }

    const passwordHandler = (e: any) => {
        setPassword(e.target.value)
        if (!isLogin) {
            if(e.target.value.length < 6 || e.target.value.length > 16){
                setPasswordError('Пароль должен содержать от 6 до 16 символов')
                if(!e.target.value) {
                    setPasswordError('Пароль не может быть пустым')
                }
                }else {
                setPasswordError('')
                }
        } else {
            setPasswordError('')
        }
    }
    const blurHandler = (e:any) => {
        switch(e.target.name){
            case 'login':
                setLoginDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40,  height: "90%" }}
            animate={{ opacity: 1, y: 0, height: "100%" }}
            exit={{ opacity: 0, y: 40, height: "90%" }}
            transition={{ duration: 0.4}}
            className={s.page_wrapper}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Регистрация</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Добро пожаловать, вы зарегестрированы, долждитесь подтверждение администратора!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='w-100' onClick={handleClose}>
                        Отлично
                    </Button>
                </Modal.Footer>
            </Modal>

            <Container className="d-flex justify-content-center align-items-center" style={{width: window.innerWidth - 328}}>
                <Card style={{width: 600, background: "#FDFDFF"}} className="p-5 rounded-4">
                    <h3 style={{fontFamily: "Inter"}} className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h3>
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            name={'login'}
                            onBlur={e => blurHandler(e)}
                            style={{height: 50, marginTop: 32}}
                            placeholder="Ваш логин..."
                            value={login}
                            onChange={e => loginHandler(e)}
                        />
                        {(loginDirty && loginError) && <div className='text-bg-danger bg-opacity-50 text-lg-start p-1 mt-1 rounded-1'>{loginError}</div>}
                        <Form.Control
                            name={'password'}
                            onBlur={e => blurHandler(e)}
                            style={{height: 50, marginTop: 12}}
                            placeholder="Ваш пароль..."
                            value={password}
                            onChange={e => passwordHandler(e)}
                            type="password"
                        />
                        {(passwordDirty && passwordError) && <div className='text-bg-danger bg-opacity-50 text-lg-start p-1 mt-1 rounded-1'>{passwordError}</div>}
                        {error && <div className='text-bg-danger bg-opacity-50 text-lg-start p-1 mt-2 rounded-1'>{error}</div>}
                        <Button
                            disabled={!formValid}
                            style={{height: 50, marginTop: 22}}
                            variant={"outline-primary"}
                            onClick={click}
                        >
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>

                        {isLogin ?
                            <div style={{marginTop: 22}}>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} style={{textDecoration: "none"}}>Зарегистрироваться</NavLink>
                            </div>
                            :
                            <div style={{marginTop: 22}}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} style={{textDecoration: "none"}}>Войти</NavLink>
                            </div>
                        }
                    </Form>
                </Card>
            </Container>
        </motion.div>
    )
})

export default Auth;