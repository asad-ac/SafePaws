import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const NavBar = () => {
    
    return (
        <nav>
            <div className='SafePaws-Logo'>
                <Link to='/'> 
                    <img src='/SafePaws-Logo.svg' alt="SafePaws Logo" width="400" height="100"/> 
                </Link>
            </div>
            <Link to='/animals'> Animals </Link>
            <Link to='/sponsors'> Sponsors </Link>
            <Link to='/volunteers'> Volunteers </Link>
            {/* <Link to='/sanctuary'> Sanctuary</Link> */}
            {/* profile icon could also be a component? */}
            {/* <div className='Profile-Icon'>
                <img href=''></img>
            </div> */}
        </nav>
    )
}
export default NavBar