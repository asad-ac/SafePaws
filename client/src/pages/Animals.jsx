import {useState, useEffect} from 'react'

const Animals = () => {

    const [animals, setAnimals] = useState([])

    useEffect(() => {
        const fetchAllAnimals = async () => {
            const response = await fetch('http://localhost:3001/animals')
            const data = await response.json()
            setAnimals(data)
        }
        fetchAllAnimals()
    },[])

  return (
    <>
        <div>
            {animals.length > 0 ? animals.map((animal) => {
                <div style={{backgroundImage: `${animal.im}`}}>
                    <h1>{animal.name}</h1>
                </div>
                }): <h1>No animals added </h1>}
        </div>
    </>
  )
}

export default Animals
