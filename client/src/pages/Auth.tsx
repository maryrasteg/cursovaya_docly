import React from 'react';
import {Container, Form, Card, Button} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{width: window.innerWidth - 328}}>
            <Card style={{width: 600, background: "#FDFDFF"}} className="p-5 rounded-4">
                <h3 style={{fontFamily: "Inter"}} className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h3>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        style={{height: 50, marginTop: 32}}
                        placeholder="Ваш логин..."
                    />
                    <Form.Control
                        style={{height: 50, marginTop: 12}}
                        placeholder="Ваш пароль..."
                    />
                    <Button style={{height: 50, marginTop: 22}} variant={"outline-primary"}>{isLogin ? "Войти" : "Зарегистрироваться"}</Button>
                    {isLogin ?
                        <div style={{marginTop: 22}}>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} style={{textDecoration: "none"}}>Зарегистрироваться</NavLink></div>
                        : <div style={{marginTop: 22}}>Есть аккаунт? <NavLink to={LOGIN_ROUTE} style={{textDecoration: "none"}}>Войти</NavLink></div>
                    }
                </Form>
            </Card>
        </Container>
    )
}

export default Auth;