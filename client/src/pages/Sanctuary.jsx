import {useState, useEffect} from 'react'
import EditSanctuary from '../components/EditSanctuary.jsx'
import {MdEdit} from "react-icons/md";
import NavBar from '../components/NavBar.jsx';
import HomeBar from '../components/HomeBar.jsx';
import Logout from '../components/Logout.jsx';
import '../css/Sanctuary.css'

const Sanctuary = () => {

    const [sanctuary, setSanctuary] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false)

    useEffect(() => {
       const getSanctuary = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/sanctuaries/1`)
        const data = await response.json()
        setSanctuary(data)
       }
       getSanctuary()
    },[])

  return (
    <>
        <NavBar />
        <HomeBar />
        <Logout />
        <div className="sanctuary-page">
            {sanctuary ? (
                <div className="sanctuary-card">
                    <h1 className="sanctuary-name">{sanctuary.name}</h1>
                    <p className="sanctuary-detail">{sanctuary.address}</p>
                    <p className="sanctuary-detail">{sanctuary.phone}</p>
                    <p className="sanctuary-detail">{sanctuary.email}</p>
                    <p className="sanctuary-detail">{sanctuary.capacity}</p>
                    <button className="sanctuary-edit-btn" onClick={() => setIsEditOpen(true)}>
                        <MdEdit /> Edit Sanctuary
                    </button>
                </div>
            ) : <h1 className="sanctuary-empty">No sanctuary yet</h1>}
        </div>

        {isEditOpen && sanctuary && (
        <EditSanctuary
            sanctuary={sanctuary}
            setSanctuary={setSanctuary}
            setIsEditOpen={setIsEditOpen}/>)}
    </>
  )
}

export default Sanctuary
