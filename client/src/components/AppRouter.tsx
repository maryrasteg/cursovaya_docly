import React, {useContext} from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import {authRoutes, publicRoutes, adminRoutes} from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';


const AppRouter = () => {
  const {user} = useContext(Context)
  console.log(user)
  return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
              <Route key={path} path={path} element={<Component/>}/>
            )}
            {(user.isAuth && user.isAdmin) && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) =>
              <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>} />
        </Routes>
  )
}


export default AppRouter
