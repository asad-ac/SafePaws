import './App.css'
import Animals from './pages/Animals.jsx'
import AnimalDetail from './pages/AnimalDetail.jsx'
import Sponsors from './pages/Sponsors.jsx'
import Volunteers from './pages/Volunteers.jsx'
import Login from './pages/Login.jsx'
import Error from './pages/Error.jsx'
import Hero from './pages/Hero.jsx'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

function App() {

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
          <Route path='/animals/:animal_id' element={<AnimalDetail />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
