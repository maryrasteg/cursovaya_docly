 import React, {useContext} from "react";
import s from './Navbar.module.css'
import NavbarLink from "./NavLink/NavbarLink";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {ReactComponent as Logo} from "./assets/logo.svg"
 import {ReactComponent as LogOut} from "./assets/logout.svg"
 import {Button} from "react-bootstrap";
import {ReactComponent as PatientIcon} from "./assets/patients.svg"
 import {ReactComponent as ReceptionsIcon} from "./assets/receptions.svg"
 import {ReactComponent as DoctorsIcon} from "./assets/doctors.svg"
 import {ReactComponent as UsersIcon} from "./assets/users.svg"
 import {ReactComponent as DocumentsIcon} from "./assets/documents.svg"

 function generateAvatar(
     text: string,
     foregroundColor = "white",
     background: any
 ) {
     const canvas = document.createElement("canvas");
     const context = canvas.getContext("2d");

     canvas.width = 200;
     canvas.height = 200;

     // Draw background
     if(context) {
         const gr = context.createLinearGradient(50, 30, 150, 150);
         gr.addColorStop(0, background[0]);
         gr.addColorStop(1, background[1]);
         context.fillStyle = gr;
         context?.fillRect(0, 0, canvas.width, canvas.height);

         // Draw text
         context.font = "100px Inter";
         context.fillStyle = foregroundColor;
         context.textAlign = "center";
         context.textBaseline = "middle";
         context.fillText(text, canvas.width / 2, canvas.height / 2);
         // let ava = document.getElementById("avatar")
         // ava && (ava.setAttribute('src', canvas.toDataURL("image/png")))
         return canvas.toDataURL("image/png")
     }
 }

const Navbar = observer(() => {
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAdmin(false)
        user.setIsAuth(false)
        user.setIsWaiter(false)
    }

    return(
        <div className={s.nav}>
                <div className={s.dividing}>
                    <Logo className = {s.logo} />
                    <div className={s.nav_links}>
                        <NavbarLink link='/' name='Пациенты' icon={<PatientIcon />}/>
                        <NavbarLink link='/receptions' name='Приемы' icon={<ReceptionsIcon />} />
                        {user.isAdmin && (<NavbarLink link='/doctors' name='Врачи' icon={<DoctorsIcon />} />) }
                        {user.isAdmin && (<NavbarLink link='/admin' name='Пользователи' icon={<UsersIcon />} />) }
                        {user.isAdmin && (<NavbarLink link='/reports' name='Отчеты' icon={<DocumentsIcon />} />) }
                    </div>
                </div>
                <div className={s.user_wrapper}>
                    <img alt="Avatar" id="avatar" src = {generateAvatar(user.user.login[0].toUpperCase(), "#414956", ["#A1C8FF", "#D8E8FF"])} />
                    <div className={s.user}>
                        {user.isAdmin ? <p>Администратор</p> : <p>Врач</p>}
                        <p style={{fontSize: 18, fontWeight: 500}}>{user.user.login}</p>
                    </div>
                    <button className={s.logout_button} onClick={logOut}><LogOut className={s.logout_icon}/></button>
                </div>
        </div>
    )
})

export default Navbar