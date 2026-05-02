import React from 'react'
import {Link} from 'react-router-dom'
import '../css/HomeBar.css'
import logo from '../assets/logo.svg'
  
const HomeBar = ({ disableLogoLink = false }) =>{
    return (
        <div className="homebar-brand">
            {disableLogoLink
                ? <img className="logobtn" src={logo} alt="logo" style={{ cursor: 'default' }} />
                : <Link to="/hero"><img className="logobtn" src={logo} alt="logo" /></Link>
            }
            <div className="homebar-text">
                <h1 className="heading">Safe Paws</h1>
                <h2 className="subheading">Rehabilitation & Sanctuary</h2>
            </div>
        </div>
    )
}
export default HomeBar