import {useState, useEffect} from 'react'
import AddAnimal from '../components/AddAnimal.jsx'
import EditAnimal from '../components/EditAnimal.jsx'
import {Link} from 'react-router-dom'
import {IoAddSharp} from 'react-icons/io5'
import {MdEdit} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";
import {IoIosWarning} from "react-icons/io";
import {RiResetLeftFill} from "react-icons/ri";

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

    const [statusFilter, setStatusFilter] = useState('all')

    const tagOptions = ["Vaccinated, Healthy, Requires Training, Special Needs, Needs Medication, New Arrival, Special Diet, Territorial"]

    const [tag, setTag] = useState([])

    // adding and removing tags

    const toggleTagFilter = (tagName) => {
        setTag((prev) => 
        prev.includes(tagName)
          ? prev.filter((tag) => tag !== tagName)
          : [...prev, tagName]
        )
    }

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

    // search, filter, and sort function
    // TODO: reset button to clear all filters

    // TODO: allow user to select multiple status
    // TODO: select tags

    const processedAnimals = animals.filter((a) =>
        a.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        a.species.toLowerCase().includes(search.trim().toLowerCase()))
        .filter((a) => {
            if (statusFilter === 'needsFeeding') return !a.feeding_status
            if (statusFilter === 'needsCleaning') return !a.cleaning_status
            if (statusFilter === 'needsCaring') return !a.care_status
            return true
        })
        
        .sort((a,b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }) 
            // alphabetical order and localcompare bc cant subtract strings
            // undefined to use browser default language
            // sensitivity base to ignore uppercase vs lowercase on comparison of input animal names
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

    const reset = () => {
        setSearch('')
        setSortBy('name')
        setStatusFilter('all')
    }

  return (
    <>
        <div className='sidebar-based-on-figma-file'>
                <h1> Animals </h1>
            <div>
                <label htmlFor='search'> Search By </label>
                <input id='search' type='search' placeholder='Search by name or species' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div>
                <label htmlFor='sort'> Sort By </label>
                <select id='sort' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name"> Name (A - Z) </option>
                    <option value="age"> Age (Oldest First) </option>
                    <option value="intake_date"> Intake Date (Oldest First) </option>
                </select>
            </div>

            <div>
                <label htmlFor='status'> Filter By </label>
                <select id='status' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value='all'> All </option>
                    <option value='needsFeeding'> Needs Feeding </option>
                    <option value='needsCleaning'> Needs Cleaning </option>
                    <option value='needsCaring'> Needs Attention </option>
                </select>
            </div>
            <p> Results: {processedAnimals.length} </p>
            <button onClick={reset} title='Reset'> <RiResetLeftFill size={18} /> </button>
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
                                {!animal.cleaning_status  && <p> <IoIosWarning /> Enrichment Needs Cleaning </p>}
                                {!animal.feeding_status && <p> <IoIosWarning /> Needs Feeding </p> }
                                {!animal.care_status && <p> <IoIosWarning /> Needs Attention </p>}
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
