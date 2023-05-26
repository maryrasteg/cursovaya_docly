import Admin from './pages/Admin'
import Auth from './pages/Auth';
import Client from './pages/Client';
import Clients from './pages/Clients';
import Doctors from './pages/Doctors';
import Reception from './pages/Reception';
import Receptions from './pages/Receptions';
import {ADMIN_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE, CLIENT_ROUTE, CLIENTS_ROUTE, DOCTORS_ROUTE, RECEPTIONS_ROUTE, RECEPTION_ROUTE} from './utils/consts';
import ClientPage from "./pages/Client";

export const authRoutes = [
    {
        path: CLIENT_ROUTE + '/:id',
        Component: ClientPage
    },
    {
        path: CLIENTS_ROUTE,
        Component: Clients
    },
    {
        path: RECEPTIONS_ROUTE,
        Component: Receptions
    },
    {
        path: RECEPTION_ROUTE,
        Component: Reception
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: DOCTORS_ROUTE,
        Component: Doctors
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]