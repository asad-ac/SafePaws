import React from 'react'
import { useNavigate } from 'react-router-dom'
import HomeBar from '../components/HomeBar'
import Footer from '../components/Footer'
import '../css/Login.css'
import loginImage from '../assets/login-image.jpg'
import warningIcon from '../assets/warning.png'


const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/hero')
  }

  return (
    <>
      <HomeBar disableLogoLink />
      <div className="login-image" style={{ backgroundImage: `url(${loginImage})` }} />
      <div className="login-container">
        <p className="login-heading">Welcome Back!</p>
        <p className="login-welcome">Sign in to the sanctuary management page.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>
        <div className="login-notice-container">
          <img className="warning-icon" src={warningIcon} alt="Warning Icon" />
          <p className="login-notice">
            This platform is restricted to authorized sanctuary staff members. Contact your sanctuary administrator if you need access.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
