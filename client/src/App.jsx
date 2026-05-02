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

  const [user, setUser] = useState(null)
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

  if (authLoading) {
    return <p> Loading... </p>
  }

  return (
    <>
    <Toaster position='bottom-left' />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to={user ? '/hero' : '/login'} replace />} />

          <Route path='/login' element={ user ? <Navigate to='/hero' replace /> : <Login setUser={setUser} />} />

          <Route path='/hero' element={ user ? <Hero setUser={setUser} /> : <Navigate to='/login' replace />} />
          <Route path='/animals' element={ user ? <Animals setUser={setUser} /> : <Navigate to='/login' replace />} />
          <Route path='/sponsors' element={ user ? <Sponsors setUser={setUser} /> : <Navigate to='/login' replace /> } />
          <Route path='/volunteers' element={user ? <Volunteers setUser={setUser} /> : <Navigate to='/login' replace />} />
          <Route path='/sanctuary' element={ user ? <Sanctuary setUser={setUser} /> : <Navigate to='/login' replace />} />
          <Route path='/animals/:animal_id' element={ user ? <AnimalDetail setUser={setUser} /> : <Navigate to='/login' replace />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
