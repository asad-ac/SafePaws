import {useState, useEffect} from 'react'
import AddVolunteer from '../components/AddVolunteer.jsx'
import EditVolunteer from '../components/EditVolunteer.jsx'
import {MdEdit} from "react-icons/md";
import {IoAddSharp} from "react-icons/io5";
import {FaRegTrashAlt} from "react-icons/fa";
import {toast} from 'react-hot-toast'

const Volunteers = () => {
    
    const [volunteers, setVolunteers] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState('')

    // TODO: search bar to search by name

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

        try {
            const deleteVolunteerPromise = async () => {
                const response = await fetch(`http://localhost:3001/volunteers/${volunteer.volunteer_id}`, options)
                
                if (!response.ok) {
                    throw new Error("Delete failed")
                }
                
                return true
            }
            
            await toast.promise(deleteVolunteerPromise(), {
                loading: `Deleting ${volunteer.name}...`,
                success: `${volunteer.name} deleted`,
                error: `Failed to delete ${volunteer.name}`
            })
            
            // keep every volunteer whose ID is NOT equal to the one admin deletes
            
            setVolunteers((prev) => prev.filter((v) => v.volunteer_id !== volunteer.volunteer_id))
        }

        catch (error) {
            console.error(error)
        }
    }

    const searchVolunteers = volunteers.filter((v) => {
        return v.name.toLowerCase().includes(search.trim().toLowerCase())
    })
    
    return (
        <>
            <div>
                <h1> Volunteers </h1>
                <input type='search' placeholder='Search by name' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={() => setIsAddOpen(true)}> <IoAddSharp /> Add Volunteer</button>
                {searchVolunteers.length > 0 ? searchVolunteers.map((volunteer) => {
                    return (
                        <div key={volunteer.volunteer_id} className=''>
                            <div className=''>
                                <p>{volunteer.name}</p>
                                <p>{volunteer.address}</p>
                                <p>{volunteer.phone}</p>
                                <p>{volunteer.email}</p>
                                <p>{volunteer.assigned_duty}</p>
                                <button onClick={() => {setSelected(volunteer), setIsEditOpen(true)}}> <MdEdit /> Edit </button>
                                <button command="show-modal" commandfor="delete-confirmation"> <FaRegTrashAlt /> Delete </button>
                                <dialog id="delete-confirmation">Are you sure you'd like to delete an Volunteer? This action can NOT be undone. 
                                    <button commandfor="delete-confirmation" command="close" >Close</button>
                                    <button onClick={() => deleteVolunteer(volunteer)} > DELETE </button>
                                </dialog>
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