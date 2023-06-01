import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import ClientsStore from './store/ClientsStore';
import ClientStore from './store/ClientStore';
import ReceptionsStore from './store/ReceptionsStore';
import ReceptionStore from './store/ReceptionStore';
import DoctorsStore from "./store/DoctorsStore";
import UsersStore from "./store/UsersStore";
import ProceduresStore from "./store/ProceduresStore";

export const Context = createContext(null as any)
console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Context.Provider value={{
      user: new UserStore(),
      users: new UsersStore(),
      clients: new ClientsStore(),
      client: new ClientStore(),
      receptions: new ReceptionsStore(),
      reception: new ReceptionStore(),
      doctors: new DoctorsStore(),
      procedures: new ProceduresStore(),

  }}>
    <App />
  </Context.Provider>
  )