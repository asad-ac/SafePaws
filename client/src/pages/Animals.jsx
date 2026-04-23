import {useState, useEffect} from 'react'
import AddAnimal from '../components/AddAnimal.jsx'
import EditAnimal from '../components/EditAnimal.jsx'
import {Link} from 'react-router-dom'
import {IoAddSharp} from 'react-icons/io5'

const Animals = () => {

    const [animals, setAnimals] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selected, setSelected] = useState(null)

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
            <p> Feedings Left: {needsFeeding} </p>
            <p> Cleanings Left: {needsCleaning} </p>
            <p> Enrichments Left: {needsCaring} </p>
        <button onClick={() => setIsAddOpen(true)}> <IoAddSharp /> Add Animal </button>
        </div>
        <div>
            {animals.length > 0 ? animals.map((animal) => {
                return (
                    <div key={animal.animal_id}>
                        <Link to={`/animals/${animal.animal_id}`}>
                        <div style={{backgroundImage: `url(${animal.image_url})`}}>
                            <h1> {animal.name} </h1>
                            <p> {animal.species} </p>
                            <p> {animal.weight} Pounds </p>
                            {animal.tags?.length > 0 ? animal.tags.map((tag) => {
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
                    </Link>
                </div>
                )
                }): <h1> No animals added </h1>}
        </div>

        {isAddOpen && 
        <AddAnimal
            setIsAddOpen={setIsAddOpen}
            // boolean and add to array of sponsors with spread 
            setAnimals={setAnimals} />}

        {isEditOpen && selected && (
            <EditAnimal
                animal = {selected}
                setIsEditOpen={setIsEditOpen}
                setAnimals={setAnimals}
            />)}
    </>
  )
}

export default Animals
