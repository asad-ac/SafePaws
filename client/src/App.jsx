import './App.css'
import Animals from './pages/Animals.jsx'
import AnimalDetail from './pages/AnimalDetail.jsx'
import Sponsors from './pages/Sponsors.jsx'
import Volunteers from './pages/Volunteers.jsx'
import Sanctuary from './pages/Sanctuary.jsx'
import Login from './pages/Login.jsx'
import Error from './pages/Error.jsx'
import Hero from './pages/Hero.jsx'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import {useEffect, useState} from 'react'

function App() {

  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/me", {
          credentials: "include"
        });

        if (!response.ok) {
          setUser(null)
          return;
        }

        const data = await response.json()
        setUser(data)
      }
      catch (error) {
        setUser(null)
      }
      finally {
        setAuthLoading(false)
      }
    }

    checkUser()
  }, [])

  return (
    <>
    <Toaster position='bottom-left' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/hero' element={<Hero />} />
          <Route path='/animals' element={<Animals />} />
          <Route path='/sponsors' element={<Sponsors />} />
          <Route path='/volunteers' element={<Volunteers />} />
          <Route path='/sanctuary' element={<Sanctuary />} />
          <Route path='/animals/:animal_id' element={<AnimalDetail />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
