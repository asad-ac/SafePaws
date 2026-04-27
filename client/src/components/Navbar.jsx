import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import '../css/NavBar.css'
import logo from '../assets/logo.svg'

const NavBar = () =>{
    return (
        <div className="navbar-brand">
            <Link to="/hero"><img className="logobtn" src={logo} alt="logo" /></Link>
            <div className="navbar-text">
                <h1 className="heading">Safe Paws</h1>
                <p className="subheading">Rehabilitation & Sanctuary</p>
            </div>
        </div>
    )
}
export default NavBar