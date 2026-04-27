import {useState, useEffect} from 'react'

import {MdEdit} from "react-icons/md";
import {IoAddSharp} from "react-icons/io5";
import {FaRegTrashAlt} from "react-icons/fa";
import {toast} from 'react-hot-toast'

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
        <div>
            <h1> Sponsors </h1>
            <input type='search' value={search} placeholder='Search by name' onChange={(e) => setSearch(e.target.value)} />
            <label htmlFor="sort"> Sort By </label>
            <select id='sort' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name"> Name A-Z </option>
                <option value="lowToHigh"> Amount (Low To High) </option>
                <option value="highToLow"> Amount (High To Low) </option>
            </select>
            {/* we map sponsors state with all fields of name, amount, address, phone, email */}
            <button onClick={() => setIsAddOpen(true)}> <IoAddSharp /> Add Sponsor </button>
            {processedSponsors.length > 0 ? processedSponsors.map((sponsor) => {
                return (
                    <div key={sponsor.sponsor_id} className=''>
                        <div className=''> 
                            <p> {sponsor.name} </p> 
                            <p> ${sponsor.amount} / Monthly </p>
                            <p> {sponsor.address} </p>
                            <p> {sponsor.phone} </p>
                            <p> {sponsor.email} </p>
                            <button onClick={() => {setSelected(sponsor), setIsEditOpen(true)}}> <MdEdit /> Edit </button>
                            <button command="show-modal" commandfor="delete-confirmation"> <FaRegTrashAlt /> Delete </button>
                            <dialog id="delete-confirmation">Are you sure you'd like to delete an Sponsor? This action can NOT be undone. 
                                <button commandfor="delete-confirmation" command="close" >Close</button>
                                <button onClick={() => deleteSponsor(sponsor)} > DELETE </button>
                            </dialog>
                        </div>
                    </div>
                )
            }) : <h2> No sponsors added </h2>}
        </div>

        {isAddOpen && 
        <AddSponsor 
            setIsAddOpen={setIsAddOpen}
            // boolean and add to array of sponsors with spread 
            setSponsors={setSponsors} />}

        {isEditOpen && selected && (
        <EditSponsor 
            // the sponsor the user selected
            sponsor={selected}
            // boolean and add to array of sponsor with spread
            setIsEditOpen={setIsEditOpen} 
            setSponsors={setSponsors} />)}
    </>
  )
}

export default Sponsors
