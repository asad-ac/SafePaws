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
const Sponsors = () => {

    const [sponsors, setSponsors] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState('name')

    useEffect(() => {
        const fetchAllSponsors = async () => {
            const response = await fetch(`http://localhost:3001/sponsors`)
            const data = await response.json()
            setSponsors(data)
        }
        fetchAllSponsors()
    },[])

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
        return s.name.toLowerCase().includes(search.trim().toLowerCase())
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
        <Logout />
        <div className='sponsors-page'>
            <div className="sponsors-header">
                <h1>Sponsors</h1>
                <div className='sponsors-sorting-section'>
                    <label htmlFor="search"> Search by </label>
                    <input
                        className="search-input"
                        type='search'
                        value={search}
                        placeholder='name'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <label htmlFor="sort"> Sort by </label>
                    <select id='sort' className="sponsors-sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name"> name (A-Z) </option>
                        <option value="lowToHigh"> amount (low To high) </option>
                        <option value="highToLow"> amount (high To low) </option>
                    </select>
                </div>
                <button className="btn-add" onClick={() => setIsAddOpen(true)}>
                    <IoAddSharp /> Add Sponsor
                </button>
            </div>

            <div className="list-headers">
                <span>name</span>
                <span>amount</span>
                <span>address</span>
                <span>phone</span>
                <span>email</span>
            </div>
            
            {processedSponsors.length > 0 ? processedSponsors.map((sponsor) => {
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
                                <button command="show-modal" commandfor="delete-confirmation" className="btn-delete"> <FaRegTrashAlt /> Delete </button>
                            </div>

                            <dialog id="delete-confirmation" className="delete-dialog">Are you sure you'd like to delete the sponsor: {sponsor.name}? This action can NOT be undone. 
                                    <button commandfor="delete-confirmation" command="close" className="btn-cancel">Close</button>
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
                    <h2>Edit Sponsor: {selected.name}</h2>
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
