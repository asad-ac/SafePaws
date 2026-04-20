import {useState, useEffect} from 'react'
import {MdEdit} from "react-icons/md";
import {IoAddSharp} from "react-icons/io5";
import AddSponsor from '../components/AddSponsor.jsx'
import EditSponsor from '../components/EditSponsor.jsx'

// TODO: delete by id button

const Sponsors = () => {

    const [sponsors, setSponsors] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const fetchAllSponsors = async () => {
            const response = await fetch(`http://localhost:3001/sponsors`)
            const data = await response.json()
            setSponsors(data)
        }
        fetchAllSponsors()
    },[])
    
  return (
    <>
        <div>
            <h1> Sponsors </h1>
            {/* we map sponsors state with all fields of name, amount, address, phone, email */}
            <button onClick={() => setIsAddOpen(true)}><IoAddSharp /> Add Sponsor </button>
            {sponsors.length > 0 ? sponsors.map((sponsor) => {
                return (
                    <div key={sponsor.sponsor_id} className=''>
                        <div className=''> 
                            <p> {sponsor.name} </p> 
                            <p> ${sponsor.amount} / Monthly </p>
                            <p> {sponsor.address} </p>
                            <p> {sponsor.phone} </p>
                            <p> {sponsor.email} </p>
                            <button onClick={() => {setSelected(sponsor), setIsEditOpen(true)}}> <MdEdit /> Edit </button>
                            <button> Delete </button>
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
