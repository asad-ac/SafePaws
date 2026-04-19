import {useEffect, useState} from 'react'

const Sanctuary = () => {

    const[data, setData] = useState([])

    useEffect(() => {
       const getSanctuary = async () => {
        const response = await fetch('http://localhost:3001/sanctuaries')
        const data = await response.json()
        setData(data)
       }
    },[])

  return (
    <div>
      {data.length > 0 ? data.map((sanctuary) => {
        
      }) : <h1> No sanctuary yet </h1>}
    </div>
  )
}

export default Sanctuary
