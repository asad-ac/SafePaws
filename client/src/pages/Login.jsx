import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../css/Login.css'
import loginImage from '../assets/login-image.jpg'

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/hero')
  }

  return (
    <>
      <NavBar />
      <div className="login-image" style={{ backgroundImage: `url(${loginImage})` }} />
      <div className="login-container">
        <p className="login-welcome">
          Welcome back! <br />Sign in to the sanctuary management page.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign In</button>
        </form>
        <p className="login-notice">
          This platform is restricted to authorized sanctuary staff members. Contact your sanctuary administrator if you need access.
        </p>
      </div>
      <Footer />
    </>
  )
}

export default Login
