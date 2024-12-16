import { NavLink } from "react-router-dom"
import './NavBar.css'

const NavBar = () => {
    return(
        <nav className="nav-bar">
            <ul>
                <li className="menu"><NavLink className={({isActive}) => isActive ? 'activeLink' : 'inactiveLink'} to='/'>Home</NavLink> </li>
                <li className="menu"><NavLink className={({isActive}) => isActive ? 'activeLink' : 'inactiveLink'} to='/gastos'>Gastos</NavLink></li>
            </ul>
        </nav>
    )
}

export default NavBar