import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const NavBar = () => {
    
    return (
        <nav>
            <div className='SafePaws-Logo'>
                <img href=''></img>
            </div>
            <Link to='/animals'> Animals </Link>
            <Link to='/sponsors'> Sponsors </Link>
            <Link to='/volunteers'> Volunteers </Link>
            <Link to='/sanctuary'> Settings </Link>
            {/* profile icon could also be a component? */}
            <div className='Profile-Icon'>
                <img href=''></img>
            </div>
        </nav>
    )
}
export default NavBar