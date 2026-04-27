import {useState, useEffect} from 'react'
import EditSanctuary from '../components/EditSanctuary.jsx'
import {MdEdit} from "react-icons/md";

const Sanctuary = () => {

    const [sanctuary, setSanctuary] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false)

    useEffect(() => {
       const getSanctuary = async () => {
        const response = await fetch('http://localhost:3001/sanctuaries/1')
        const data = await response.json()
        setSanctuary(data)
       }
       getSanctuary()
    },[])

  return (
    <>
        <div>
            {sanctuary ? (
                <div>
                    <h1> {sanctuary.name}</h1>
                    <p> {sanctuary.address} </p>
                    <p> {sanctuary.phone} </p>
                    <p> {sanctuary.email}</p>
                    <p> {sanctuary.capacity} </p>
                </div>
            ) : <h1> No sanctuary yet </h1>}
        </div>
        
        {sanctuary &&
        <button onClick={() => setIsEditOpen(true)}> <MdEdit /> Edit Sanctuary </button>}
        
        {isEditOpen && sanctuary && (
        <EditSanctuary
            sanctuary={sanctuary} 
            setSanctuary={setSanctuary}
            setIsEditOpen={setIsEditOpen}/>)}
    </>
  )
}

export default Sanctuary