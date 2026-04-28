import {NavLink, NavLink} from 'react-router-dom'
import '../css/NavBar.css'

const NavBar = () =>{
    return (
        <nav>
            <div className="navbar-links">
                <NavLink to='/animals' className={({isActive}) => isActive ? }> Animals </NavLink>
                <NavLink to='/sponsors'> Sponsors </NavLink>
                <NavLink to='/volunteers'> Volunteers </NavLink>
                <NavLink to='/sanctuary'> Settings </NavLink>
            </div>
        </nav>
    )
}
export default NavBar