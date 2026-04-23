import {useState, useEffect} from 'react'
import AddVolunteer from '../components/AddVolunteer.jsx'
import EditVolunteer from '../components/EditVolunteer.jsx'
import {MdEdit} from "react-icons/md";
import {IoAddSharp} from "react-icons/io5";
import {FaRegTrashAlt} from "react-icons/fa";

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

    const deleteVolunteer = async (volunteer) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`http://localhost:3001/volunteers/${volunteer.volunteer_id}`, options)
        const data = await response.json()

        // keep every volunteer whose ID is NOT equal to the one admin deletes

        setVolunteers((prev) => prev.filter((v) => v.volunteer_id !== volunteer.volunteer_id))

        return data
    }
    
    return (
        <>
            <div>
                <h1> Volunteers </h1>
                <button onClick={() => setIsAddOpen(true)}> <IoAddSharp /> Add Volunteer</button>
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
                                <button onClick={() => deleteVolunteer(volunteer)}> <FaRegTrashAlt /> Delete </button>
                            </div>
                        </div>
                    )
                }) : <h2> No volunteers added </h2>}
            </div>

            {isAddOpen && 
            <AddVolunteer
                setIsAddOpen={setIsAddOpen}
                setVolunteers={setVolunteers} />}

            {isEditOpen && selected && (
            <EditVolunteer
                volunteer={selected}
                setIsEditOpen={setIsEditOpen}
                setVolunteers={setVolunteers}/>)}
        </>
    )
}

export default Volunteers