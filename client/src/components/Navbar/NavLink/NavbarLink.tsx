import s from './NavbarLink.module.css'
import { NavLink } from "react-router-dom"

interface NavbarLinkProps {
    link: string;
    name: string;
    icon: any;
  }


const NavbarLink = ({ link, name, icon }: NavbarLinkProps) => {
    return (
        <NavLink to={link} className = { navData => navData.isActive ? s.active : s.linkWrapper }> <div className={s.linkText}>{icon} {name} </div></NavLink>
    )

}


export default NavbarLink;