import {useState, useEffect} from 'react'
import AddVolunteer from '../components/AddVolunteer.jsx'
import EditVolunteer from '../components/EditVolunteer.jsx'
import { MdEdit } from "react-icons/md";

const Volunteers = () => {
    
    const [volunteers, setVolunteers] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const fetchAllVolunteers = async () => {
            const response = await fetch(`http://localhost:3001/volunteers`)
            const data = await response.json()
            setVolunteers(data)
        }
        fetchAllVolunteers()
    },[])
    
    return (
        <div>
            <h1> Volunteers </h1>
            <button onClick={() => setIsAddOpen(true)}>+ Add Volunteer</button>
            {volunteers.length > 0 ? volunteers.map((volunteer) => {
                return (
                    <div key={volunteer.volunteer_id} className=''>
                        <div className=''>
                            <p>{volunteer.name}</p>
                            <p>{volunteer.address}</p>
                            <p>{volunteer.phone}</p>
                            <p>{volunteer.email}</p>
                            <p>{volunteer.assigned_duty}</p>
                            <button onClick={() => {setSelected(volunteer), setIsEditOpen(true)}}> <MdEdit /> Edit </button>
                        </div>
                    </div>
                )
            }) : <h2> No volunteers added</h2>}

            {isAddOpen && 
            <AddVolunteer
                setIsAddOpen={setIsAddOpen}
                setVolunteers={setVolunteers} />}

            {isEditOpen && selected && (
            <EditVolunteer
                volunteer={selected}
                setIsEditOpen={setIsEditOpen}
                setVolunteers={setVolunteers}/>)}
        </div>
    )
}

export default Volunteers