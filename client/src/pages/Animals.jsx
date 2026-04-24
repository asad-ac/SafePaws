import {useState, useEffect} from 'react'
import AddAnimal from '../components/AddAnimal.jsx'
import EditAnimal from '../components/EditAnimal.jsx'
import {Link} from 'react-router-dom'
import {IoAddSharp} from 'react-icons/io5'
import {MdEdit} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";

const Animals = () => {

    const [animals, setAnimals] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [selected, setSelected] = useState(null)

    // searching state

    const [search, setSearch] = useState("")

    // sort state

    const [sortBy, setSortBy] = useState('name')

    // filter state

    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        const fetchAllAnimals = async () => {
            const response = await fetch('http://localhost:3001/animals')
            const data = await response.json()
            setAnimals(data)
        }
        fetchAllAnimals()
    },[])

    const deleteAnimal = async (animal) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(`http://localhost:3001/animals/${animal.animal_id}`, options)
        const data = await response.json()

        // keep every animal whose ID is NOT equal to the one admin deletes

        setAnimals((prev) => prev.filter((a) => a.animal_id !== animal.animal_id))

        return data
    }

    // TODO: make sure backend receives not in string, but in boolean. assign value on inputs as true or false.
    // TODO: filter functions for counts

    const needsCleaning = animals.filter(animal => !animal.cleaning_status).length
    const needsFeeding = animals.filter(animal => !animal.feeding_status).length
    const needsCaring = animals.filter(animal => !animal.care_status).length

    // filter and sort function

    const processedAnimals = animals.filter((a) =>
        a.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        a.species.toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a,b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name) // alphabetical order and localcompare bc cant subtract strings
        }
        if (sortBy === 'age') {
            return b.age - a.age // oldest to youngest
        }

        if (sortBy === 'intake_date') {
            return new Date(a.date_intake) - new Date(b.date_intake) // oldest to newest
        }

        return 0 // keep order same
    })

    // TODO: tell user order of sorts in jsx

  return (
    <>
        <div className='sidebar-based-on-figma-file'>
                <h1> Animals </h1>
            <div>
                <label> Search By </label>
                <input type='search' placeholder='Search by name or species' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div>
                <label htmlFor='sort'> Sort By </label>
                <select id='sort' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name"> Name </option>
                    <option value="age"> Age </option>
                    <option value="intake_date"> Intake Date </option>
                </select>
            </div>

            <div>
                <select value={filterBy} onChange={() => setFilterBy(e.target.value)}>
                    <option></option>
                    <option></option>
                    <option></option>
                </select>
            </div>
        </div>

        <div>
            <p> Feedings Left: {needsFeeding} </p>
            <p> Cleanings Left: {needsCleaning} </p>
            <p> Enrichments Left: {needsCaring} </p>
            <button onClick={() => setIsAddOpen(true)}> <IoAddSharp /> Add Animal </button>
        </div>
        <div>
            {processedAnimals.length > 0 ? processedAnimals.map((animal) => {
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
                    <button onClick={() => {setSelected(animal), setIsEditOpen(true)}}> <MdEdit /> Edit </button>
                    <button onClick={() => deleteAnimal(animal)}> <FaRegTrashAlt /> Delete </button>
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
                animal={selected}
                setIsEditOpen={setIsEditOpen}
                setAnimals={setAnimals}/>)}
    </>
  )
}

export default Animals
