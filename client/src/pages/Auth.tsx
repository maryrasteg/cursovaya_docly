import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button} from "react-bootstrap";
import {Navigate, NavLink, useLocation, useNavigate} from "react-router-dom";
import {CLIENTS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {signIn, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate  = useNavigate()
    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await signIn(login, password)
                user.setUser(data)
                user.setIsAuth(true)
                user.setRoles(user.user.role)
                if (user.isAuth) {
                    navigate(CLIENTS_ROUTE)
                }
            } else {
                data = await registration(login, password)
                user.setUser(data)
                user.setIsAuth(false)
                user.setIsAdmin(false)
                user.setIsWaiter(true)
            }
        } catch (e: any) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{width: window.innerWidth - 328}}>
            <Card style={{width: 600, background: "#FDFDFF"}} className="p-5 rounded-4">
                <h3 style={{fontFamily: "Inter"}} className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h3>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        style={{height: 50, marginTop: 32}}
                        placeholder="Ваш логин..."
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        style={{height: 50, marginTop: 12}}
                        placeholder="Ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Button
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
    )
})

export default Auth;