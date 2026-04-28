import React from 'react'
import { useNavigate } from 'react-router-dom'
import HomeBar from '../components/HomeBar'
import NavBar from '../components/NavBar'
import Logout from '../components/Logout'
import Footer from '../components/Footer'
import '../css/Error.css'

const Error = () => {
    return (
        <>
            <HomeBar />
            <NavBar />
            <Logout />
            <div className="error-container">
                <h1 className="error-code">404</h1>
                <p className="error-message">Page Not Found</p>
                <button className="error-btn" onClick={() => window.history.back()}>Go Back</button>
            </div>
            <Footer />
        </>
    )
}

export default Error