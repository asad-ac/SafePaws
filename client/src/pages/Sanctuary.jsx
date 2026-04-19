import {useEffect, useState} from 'react'
import EditSanctuary from '../components/EditSanctuary.jsx'

const Sanctuary = () => {

    const [sanctuary, setSanctuary] = useState([])
    const [isEditOpen, setisEditOpen] = useState(false)

    useEffect(() => {
       const getSanctuary = async () => {
        const response = await fetch('http://localhost:3001/sanctuaries')
        const data = await response.json()
        setSanctuary(data)
       }
       getSanctuary()
    },[])

  return (
    <>
        <div>
        {sanctuary.length > 0 ? data.map((sanc) => {
            <div key={sanc.sanctuary_id}>
                <h1> {sanc.name}</h1>
                <p> {sanc.address} </p>
                <p> {sanc.phone} </p>
                <p> {sanc.email}</p>
                <p> {sanc.capacity} </p>
            </div>
        }) : <h1> No sanctuary yet </h1>}
        </div>

        <EditSanctuary />
    </>
  )
}

export default Sanctuary
