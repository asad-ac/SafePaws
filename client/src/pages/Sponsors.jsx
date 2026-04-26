import {useState, useEffect} from 'react'
import AddSponsor from '../components/AddSponsor.jsx'
import EditSponsor from '../components/EditSponsor.jsx'
import {MdEdit} from "react-icons/md";
import {IoAddSharp} from "react-icons/io5";
import {FaRegTrashAlt} from "react-icons/fa";
import {toast} from 'react-hot-toast'

const Sponsors = () => {

    //TODO: search bar to search by name

    const [sponsors, setSponsors] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState('')

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
                loading: `Deleting ${volunteer.name}...`,
                success: `${volunteer.name} deleted`,
                error: `Failed to delete ${volunteer.name}`
            })
            
            // goes through array of sponsors and returns array of sponsors who are not the one that was deleted 
            setSponsors((prev) => prev.filter((s) => s.sponsor_id !== sponsor.sponsor_id))
        }
        catch (error) {
            console.error(error)
        }
    }

    const searchSponsors = sponsors.filter((s) => {
        return s.name.toLowerCase().includes(search.trim().toLowerCase())
    })
    
  return (
    <>
        <div>
            <h1> Sponsors </h1>
            <input type='search' value={search} placeholder='Search by name' onChange={(e) => setSearch(e.target.value)} />
            {/* we map sponsors state with all fields of name, amount, address, phone, email */}
            <button onClick={() => setIsAddOpen(true)}> <IoAddSharp /> Add Sponsor </button>
            {searchSponsors.length > 0 ? searchSponsors.map((sponsor) => {
                return (
                    <div key={sponsor.sponsor_id} className=''>
                        <div className=''> 
                            <p> {sponsor.name} </p> 
                            <p> ${sponsor.amount} / Monthly </p>
                            <p> {sponsor.address} </p>
                            <p> {sponsor.phone} </p>
                            <p> {sponsor.email} </p>
                            <button onClick={() => {setSelected(sponsor), setIsEditOpen(true)}}> <MdEdit /> Edit </button>
                            <button onClick={() => deleteSponsor(sponsor)}> <FaRegTrashAlt /> Delete </button>
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
