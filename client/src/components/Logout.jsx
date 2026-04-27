import '../css/Logout.css'
import React from 'react'
import { Link } from 'react-router-dom'
import profileImage from '../assets/profile-image.png'

const Logout = () => {
    return (
        <>
            <div className="logout-container">
                <img className="profile-img" src={profileImage} alt="Profile" />
                <Link to="/login" className="logout-btn">Log Out</Link>
            </div>
        </>
    )
}

export default Logout
