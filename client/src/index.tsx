import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import ClientsStore from './store/ClientsStore';
import ClientStore from './store/ClientStore';
import ReceptionsStore from './store/ReceptionsStore';
import ReceptionStore from './store/ReceptionStore';

export const Context = createContext(null as any)
console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    clients: new ClientsStore(),
    client: new ClientStore(),
    receptions: new ReceptionsStore(),
    reception: new ReceptionStore()
  }}>
    <App />
  </Context.Provider>
  )