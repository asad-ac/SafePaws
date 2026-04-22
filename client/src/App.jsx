import './App.css'
import Animals from './pages/Animals.jsx'
import AnimalDetail from './pages/AnimalDetail.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/animals' element={<Animals />} />
        <Route path='/animals/:animal_id' element={<AnimalDetail />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
