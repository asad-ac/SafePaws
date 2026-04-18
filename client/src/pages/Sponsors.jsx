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
    <h1> Sponsors </h1>
      {/* we map sponsors state with all fields of name, amount, address, phone, email */}
      {sponsors.length > 0 ? sponsors.map((sponsor) => {
        return (
            <div className=''>
                <div className='' key={sponsor.sponsor_id}> 
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
    </div>
  )
}

export default Sponsors
