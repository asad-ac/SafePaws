import {useState, useEffect} from 'react'
import AddSponsor from '../components/AddSponsor'
import EditSponsor from '../components/EditSponsor'

const Sponsors = () => {

    const [sponsors, setSponsors] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    useEffect(() => {
        const fetchAllSponsors = async () => {
            const response = await fetch (`http://localhost:3001/sponsors`)
            const data = await response.json()
            setSponsors(data)
        }
        fetchAllSponsors()
    },[])
    
  return (
    <div>
    <h1> Sponsors </h1>
      {/* we map sponsors state with all fields of name, amount, address, phone, email */}
      <button onClick={() => setIsAddOpen(true)}>Add Sponsor</button>
      {sponsors.length > 0 ? sponsors.map((sponsor) => {
        return (
            <div key={sponsor.sponsor_id} className=''>
                <div className=''> 
                    <p> {sponsor.name} </p> 
                    <p> ${sponsor.amount} / Monthly </p>
                    <p> {sponsor.address} </p>
                    <p> {sponsor.phone} </p>
                    <p> {sponsor.email} </p>
                    <button> Edit </button>
                    <button> Delete </button>
                </div>
            </div>
        )
      }) : <h2> No sponsors added </h2>}

        {isAddOpen && (
            <AddSponsor
            setIsAddOpen={setIsAddOpen}
            setSponsors={setSponsors} />
        )}

        {isEditOpen && (
            <EditSponsor
            sponsor = {sponsors}
            setIsEditOpen={setIsEditOpen}
            setSponsors={setSponsors} />
        )}
        
    </div>
  )
}

export default Sponsors
