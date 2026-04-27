import React from 'react'
import wallpaper from '../assets/wallpaper.jpg'
import '../css/Hero.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Logout from '../components/Logout'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <>
      <NavBar />
      <Logout />
      <div className="wallpaper" style={{ backgroundImage: `url(${wallpaper})` }} />
      <p1 className="hero-text">Every animal deserves a safe and enriching life.<br />Thank you for your continued support.</p1>
      <div className="button-group">
        <Link to="/sponsors"><button>SPONSORS</button></Link>
        <Link to="/animals"><button>ANIMALS</button></Link>
        <Link to="/volunteers"><button>VOLUNTEERS</button></Link>
      </div>
      <Footer />
    </>
  )
}

export default Hero
