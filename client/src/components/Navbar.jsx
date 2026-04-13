import React from 'react'

const NavBar = () =>{
    return (
        <nav>
            <div class='SafePaws-Logo'>
                <img href=''></img>
            </div>
            <ul>
                Animals
            </ul>
            <ul>
                Sponsors
            </ul>
            <ul>
                Volunteers
            </ul>
            <ul>
                Settings
            </ul>
            {/* profile icon could also be a component? */}
            <div class='Profile-Icon'>
                <img href=''></img>
            </div>
        </nav>
    )
}
export default NavBar