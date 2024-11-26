import { NavLink } from "react-router-dom"

const NavBar = () => {
    return(
        <nav className="nav-bar">
            <ul>
                <li className="menu"><NavLink to='/'>Home</NavLink> </li>
                <li className="menu"><NavLink to='/gastos'>Gastos</NavLink></li>
            </ul>
        </nav>
    )
}

export default NavBar