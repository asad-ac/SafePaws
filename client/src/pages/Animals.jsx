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

    // TODO: make sure backend receives not in string, but in boolean. assign value on inputs as true or false.
    // TODO: filter functions for counts

    const needsCleaning = animals.filter(animal => !animal.cleaning_status).length
    const needsFeeding = animals.filter(animal => !animal.feeding_status).length
    const needsCaring = animals.filter(animal => !animal.care_status).length

  return (
    <>
        <div>
            
        </div>
        <div>
            {animals.length > 0 ? animals.map((animal) => {
                return (
                    <div key={animal.animal_id} style={{backgroundImage: `url(${animal.image_url})`}}>
                        <h1> {animal.name} </h1>
                        <p> {animal.species} </p>
                        <p> {animal.weight} </p>
                        {animal.tags.length > 0 ? animal.tags.map((tag) => {
                            return (
                                <div key={tag.tag_id}>
                                    <p> {tag.name} </p>
                                </div>
                            )
                        }): null}
                        <div>
                            {!animal.cleaning_status  && <p> Enrichment Needs Cleaning </p>}
                            {!animal.feeding_status && <p> Needs Feeding </p> }
                            {!animal.care_status && <p> Needs Attention </p>}
                        </div>
                    </div>
                )
                }): <h1> No animals added </h1>}
        </div>
    </>
  )
}

export default Animals
