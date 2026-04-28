import {NavLink} from 'react-router-dom'
import '../css/NavBar.css'

const base = {
    fontSize: '36px',
    color: '#1E1E1E',
    textDecoration: 'none'
}

const active = {
    borderBottom: '2px solid #9ADAB0'
}

const NavBar = () =>{
    return (
        <nav>
            <div className="navbar-links">
                <NavLink to='/animals' end style={({isActive}) => isActive ? {...base, ...active} : base}> Animals </NavLink>
                <NavLink to='/sponsors' end style={({isActive}) => isActive ? {...base, ...active} : base}> Sponsors </NavLink>
                <NavLink to='/volunteers' end style={({isActive}) => isActive ? {...base, ...active} : base}> Volunteers </NavLink>
                <NavLink to='/sanctuary' end style={({isActive}) => isActive ? {...base, ...active} : base}> Settings </NavLink>
            </div>
        </nav>
    )
}
export default NavBar