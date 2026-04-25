import './App.css'
import Animals from './pages/Animals.jsx'
import AnimalDetail from './pages/AnimalDetail.jsx'
import Sponsors from './pages/Sponsors.jsx'
import Volunteers from './pages/Volunteers.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
    <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/animals' element={<Animals />} />
          <Route path='/sponsors' element={<Sponsors />} />
          <Route path='/volunteers' element={<Volunteers />} />
          <Route path='/animals/:animal_id' element={<AnimalDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
