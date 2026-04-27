import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import '../css/NavBar.css'

const NavBar = () =>{
    return (
        <nav>
            <div className="navbar-links">
                <Link to='/animals'> Animals </Link>
                <Link to='/sponsors'> Sponsors </Link>
                <Link to='/volunteers'> Volunteers </Link>
                <Link to='/sanctuary'> Settings </Link>
            </div>
        </nav>
    )
}
export default NavBar