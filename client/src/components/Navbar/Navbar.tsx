 import React, {useContext} from "react";
import s from './Navbar.module.css'
import NavbarLink from "./NavLink/NavbarLink";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {ReactComponent as Logo} from "./assets/logo.svg"

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
    return(
        <div className={s.nav}>
                <div className={s.dividing}>
                    <Logo />
                    <div className={s.nav_links}>
                        <NavbarLink link='/' name='Пациенты' />
                        <NavbarLink link='/receptions' name='Приемы' />
                        {user.isAdmin && (<NavbarLink link='/doctors' name='Врачи' />) }
                        {user.isAdmin && (<NavbarLink link='/admin' name='Пользователи' />) }
                    </div>
                </div>
                <div className={s.user_wrapper}>
                    <img alt="Avatar" id="avatar" src = {generateAvatar(user.login[0].toUpperCase(), "#414956", ["#A1C8FF", "#D8E8FF"])} />
                    <div className={s.user}>
                        {user.isAdmin ? <p>Администратор</p> : <p>Врач</p>}
                        <p style={{fontSize: 18, fontWeight: 500}}>{user.login}</p>
                    </div>
                </div>
        </div>
    )
})

export default Navbar