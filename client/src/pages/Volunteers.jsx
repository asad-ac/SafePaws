import {useState, useEffect} from 'react'
import {MdEdit} from "react-icons/md";
import {IoAddSharp} from "react-icons/io5";
import {FaRegTrashAlt} from "react-icons/fa";
import {toast} from 'react-hot-toast'

import AddVolunteer from '../components/AddVolunteer.jsx'
import EditVolunteer from '../components/EditVolunteer.jsx'
import NavBar from '../components/NavBar.jsx'
import HomeBar from '../components/HomeBar.jsx'
import Logout from '../components/Logout.jsx';
import SkeletonVolunteers from '../components/SkeletonVolunteers.jsx'
import '../css/Volunteers.css'

const Volunteers = () => {
    
    const [volunteers, setVolunteers] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAllVolunteers = async () => {
            try {
                setLoading(true)
                setError('')
    
                const response = await fetch('http://localhost:3001/volunteers')
    
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`)
                }
    
                const data = await response.json()
                setVolunteers(data)
    
            } catch (err) {
                console.error(err)
                setError(err.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }
    
        fetchAllVolunteers()
    }, [])

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
        return (v.name || '').toLowerCase().includes(search.trim().toLowerCase())
    })

    function closeDialogOutside(e) {
        if (e.target === e.currentTarget) {
            e.currentTarget.close()
        }
    }
    
    return (
        <>
            <HomeBar />
            <NavBar/>
            <Logout setUser={props.setUser} />
            <div className='volunteers-header'>
                <h1 className='volunteers-title'>Volunteers</h1>
                <input className='volunteers-search' type='search' placeholder='Search by name' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className='volunteers-add-btn' onClick={() => setIsAddOpen(true)}><IoAddSharp /> Add Volunteer</button>
            </div>
            <div className='volunteers-container'>
            {loading ? (
                <SkeletonVolunteers />
            ) : error ? (
                <div className="error-message">
                    <p>Error: {error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            ) : searchVolunteers.length > 0 ? searchVolunteers.map((volunteer) => {
                    return (
                        <div key={volunteer.volunteer_id} className='volunteer-card'>
                            <div className=''>
                                <p>{volunteer.name}</p>
                                <p>{volunteer.address}</p>
                                <p>{volunteer.phone}</p>
                                <p>{volunteer.email}</p>
                                <p>{volunteer.assigned_duty}</p>
                                <button onClick={() => {setSelected(volunteer), setIsEditOpen(true)}}> <MdEdit /> Edit </button>
                                <button command="show-modal" commandfor={`delete-confirmation-${volunteer.volunteer_id}`}> <FaRegTrashAlt /> Delete </button>
                                <dialog id={`delete-confirmation-${volunteer.volunteer_id}`} onClick={closeDialogOutside} >Are you sure you'd like to delete an Volunteer? This action can NOT be undone.
                                    <button  commandfor={`delete-confirmation-${volunteer.volunteer_id}`} command="close" >Close</button>
                                    <button onClick={() => deleteVolunteer(volunteer)} > DELETE </button>
                                </dialog>
                            </div>
                        </div>
                    )
                }) : <h2> No volunteers added yet.</h2>}
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