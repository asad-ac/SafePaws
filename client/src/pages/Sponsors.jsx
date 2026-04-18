import {useState, useEffect} from 'react'

const Sponsors = () => {

    const [sponsors, setSponsors] = useState([])

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
      {/* we map sponsors state with all fields of name, amount, address, phone, email */}
      {sponsors.length > 0 ? sponsors.map((sponsor) => {
        return (
            <div key={sponsor.sponsor_id}> 
                <h1> {sponsor.name} </h1> 
                <h1> {sponsor.amount} </h1>
                <h1> {sponsor.address} </h1>
                <h1> {sponsor.phone} </h1>
                <h1> {sponsor.email} </h1>
            </div>
    )
      }) : <h1> No sponsors added </h1>}
    </div>
  )
}

export default Sponsors
