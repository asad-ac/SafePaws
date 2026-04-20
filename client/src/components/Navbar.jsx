import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () =>{
    return (
        <nav>
            <div className='SafePaws-Logo'>
                <img href=''></img>
            </div>
            <Link> Animals </Link>
            <Link> Sponsors </Link>
            <Link> Volunteers </Link>
            <Link> Settings </Link>
            {/* profile icon could also be a component? */}
            <div className='Profile-Icon'>
                <img href=''></img>
            </div>
        </nav>
    )
}
export default NavBar