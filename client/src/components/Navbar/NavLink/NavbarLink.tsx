import s from './NavbarLink.module.css'
import { NavLink } from "react-router-dom"

interface NavbarLinkProps {
    link: string;
    name: string;
  }


const NavbarLink = ({ link, name }: NavbarLinkProps) => {
    return (
        <NavLink to={link} className = { navData => navData.isActive ? s.active : s.linkWrapper }> <div className={s.linkText}> {name} </div></NavLink>
    )

}


export default NavbarLink;