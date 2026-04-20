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
                <div style={{backgroundImage: `${animal.image_url}`}}>
                    <h1> {animal.name} </h1>
                    <p> {animal.species} </p>
                    <p> {animal.weight} </p>
                    {animal.tags.length > 0 ? animal.tags.map((tag) => {
                        <p> {tag} </p>
                    }): null}
                </div>
                }): <h1>No animals added </h1>}
        </div>
    </>
  )
}

export default Animals
