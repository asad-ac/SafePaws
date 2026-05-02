import {useState, useEffect} from 'react'

import {MdEdit} from "react-icons/md";
import {IoAddSharp} from "react-icons/io5";
import {FaRegTrashAlt} from "react-icons/fa";
import {toast} from 'react-hot-toast'
import '../css/Sponsors.css'

import AddSponsor from '../components/AddSponsor.jsx'
import EditSponsor from '../components/EditSponsor.jsx'
import NavBar from '../components/NavBar.jsx'
import HomeBar from '../components/HomeBar.jsx'
import Logout from '../components/Logout.jsx';
import SkeletonSponsors from '../components/SkeletonSponsors.jsx'

// TODO: fix sponsors skeleton
// TODO: add on click outside of modal closes

function closeDialogOutside(e) {
    if (e.target === e.currentTarget) {
        e.currentTarget.close()
    }
}

const Sponsors = () => {

    const [sponsors, setSponsors] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAllSponsors = async () => {
            try {
                setLoading(true)
                setError('')
    
                const response = await fetch('http://localhost:3001/sponsors')
    
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`)
                }
    
                const data = await response.json()
                setSponsors(data)
    
            } catch (err) {
                console.error(err)
                setError(err.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }
    
        fetchAllSponsors()
    }, [])

    const deleteSponsor = async (sponsor) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const deleteSponsorPromise = async () => {
                const response = await fetch(`http://localhost:3001/sponsors/${sponsor.sponsor_id}`, options)
                
                if (!response.ok) {
                    throw new Error("Delete failed")
                }
                
                return true
            }
            
            await toast.promise(deleteSponsorPromise(), {
                loading: `Deleting ${sponsor.name}...`,
                success: `${sponsor.name} deleted`,
                error: `Failed to delete ${sponsor.name}`
            })
            
            // goes through array of sponsors and returns array of sponsors who are not the one that was deleted 
            setSponsors((prev) => prev.filter((s) => s.sponsor_id !== sponsor.sponsor_id))
        }
            catch (error) {
                console.error(error)
            }
    }

    const processedSponsors = [...sponsors].filter((s) => {
        return (s.name || '').toLowerCase().includes(search.trim().toLowerCase())
    })
    .sort((a,b) => {
        if (sortBy === 'lowToHigh') {
            return Number(a.amount) - Number(b.amount)
        }
        if (sortBy === 'highToLow') {
            return Number(b.amount) - Number(a.amount)
        }

        return a.name.localeCompare(b.name)
    })
    
  return (
    <>
        <NavBar/>
        <HomeBar />
        <Logout setUser={props.setUser} />
        <div className='sponsors-page'>
            <div className="sponsors-header">
                <h1>Sponsors</h1>
                <div className='sponsors-sorting-section'>
                    <label htmlFor="search"> Search by </label>
                    <input
                        className="search-input"
                        type='search'
                        value={search}
                        placeholder='Search by name'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <label htmlFor="sort"> Sort by </label>
                    <select id='sort' className="sponsors-sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name"> Name (A-Z) </option>
                        <option value="lowToHigh"> Amount (Low-High) </option>
                        <option value="highToLow"> Amount (High-Low) </option>
                    </select>
                </div>
                <button className="btn-add" onClick={() => setIsAddOpen(true)}>
                    <IoAddSharp /> Add Sponsor
                </button>
            </div>

            <div className="list-headers">
                <span>Name</span>
                <span>Amount</span>
                <span>Address</span>
                <span>Phone</span>
                <span>Email</span>
            </div>
            
            {loading ? (
                <SkeletonSponsors />
            ) : error ? (
                <div className="error-message">
                    <p>Error: {error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            ) : processedSponsors.length > 0 ? processedSponsors.map((sponsor) => {
                return (
                    <div key={sponsor.sponsor_id} className='sponsor-card'>
                        <div className='sponsor-info'> 
                            <p className="sponsor-name"> {sponsor.name} </p> 
                            <p className="sponsor-amount"> ${sponsor.amount} / Monthly </p>
                            <p className="sponsor-address"> {sponsor.address} </p>
                            <p className="sponsor-phone"> {sponsor.phone} </p>
                            <p className="sponsor-email"> {sponsor.email} </p>

                            <div className="sponsor-actions"> 
                                <button onClick={() => {setSelected(sponsor), setIsEditOpen(true)}} className="btn-edit"> <MdEdit /> Edit </button>
                                <button command="show-modal"  commandfor={`delete-confirmation-${sponsor.sponsor_id}`} className="btn-delete"> <FaRegTrashAlt /> Delete </button>
                            </div>

                            <dialog id={`delete-confirmation-${sponsor.sponsor_id}`} onClick={closeDialogOutside} className="delete-dialog">Are you sure you'd like to delete the sponsor: {sponsor.name}? This action can NOT be undone. 
                                    <button commandfor={`delete-confirmation-${sponsor.sponsor_id}`} command="close" className="btn-cancel">Close</button>
                                    <button onClick={() => deleteSponsor(sponsor)} className="btn-delete"> DELETE </button>
                            </dialog>
                        </div>
                    </div>
                )
            }) : <h2> No sponsors added yet.</h2>}
        </div>

        {isAddOpen && 
        (<div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Sponsor</h2>
                <AddSponsor 
                    setIsAddOpen={setIsAddOpen}
                    // boolean and add to array of sponsors with spread 
                    setSponsors={setSponsors} 
                />
            </div>
        </div> )}

        {isEditOpen && selected && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <EditSponsor 
                        // the sponsor the user selected
                        sponsor={selected}
                        // boolean and add to array of sponsor with spread
                        setIsEditOpen={setIsEditOpen} 
                        setSponsors={setSponsors} 
                    />
                </div>
            </div>
        )}
    </>
  )
}

export default Sponsors