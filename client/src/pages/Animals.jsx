import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {IoAddSharp} from 'react-icons/io5'
import {MdEdit} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";
import {IoIosWarning} from "react-icons/io";
import {RiResetLeftFill} from "react-icons/ri";
import {toast} from 'react-hot-toast'

import AddAnimal from '../components/AddAnimal.jsx'
import EditAnimal from '../components/EditAnimal.jsx'
import NavBar from '../components/NavBar.jsx'
import HomeBar from '../components/HomeBar.jsx'
import Logout from '../components/Logout.jsx';
import '../css/Animals.css'

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

    const tagOptions = ["Needs Medication", "Requires Training", "Special Needs", "Special Diet", "New Arrival", "Vaccinated", "Territorial", "Healthy"]

    const [selectedTags, setSelectedTags] = useState([])

    // adding and removing tags

    const toggleTagFilter = (tagName) => {
        setSelectedTags((prev) => 
        prev.includes(tagName)
          ? prev.filter((tag) => tag !== tagName)
          : [...prev, tagName]
        )
    }

    useEffect(() => {
        const fetchAllAnimals = async () => {
            // TODO: add error catching if the fetch returns an error?
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
  
    try {
        const deleteAnimalPromise = async () => {
            const response = await fetch(`http://localhost:3001/animals/${animal.animal_id}`, options)

            if (!response.ok) {
                throw new Error("Delete failed")
            }

        return true
        }

      await toast.promise(deleteAnimalPromise(), {
        loading: `Deleting ${animal.name}...`,
        success: `${animal.name} deleted`,
        error: `Failed to delete ${animal.name}`
      })

      // keep every animal whose ID is NOT equal to the one admin

      setAnimals((prev) => prev.filter((a) => a.animal_id !== animal.animal_id))
    } 
    
    catch (error) {
      console.error(error)
    }
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
            if (statusFilter === 'needsFeeding') {
                return !a.feeding_status
            }
            if (statusFilter === 'needsCleaning') {
                return !a.cleaning_status
            }
            if (statusFilter === 'needsCaring') {
                return !a.care_status
            }
            return true
        })

        // or behavior not AND for checkboxes.

        .filter((a) => {
            if (selectedTags.length === 0) {
                return true
            }

            return selectedTags.some((selectedTag) =>
                a.tags?.some((tag) => tag.name === selectedTag))
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

    const resetFilterButton = () => {
        setSearch('')
        setSortBy('name')
        setStatusFilter('all')
        setSelectedTags([])
    }

  return (
    <>
        <HomeBar />
        <NavBar/>
        <Logout />
        <div className='sidebar'>
                <h1>Animals</h1>
            <div className='search-container'>
                <label htmlFor='search'>Search by</label>
                <input id='search' type='search' placeholder='enter name or species' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className='sort-container'>
                <label htmlFor='sort'>Sort by</label>
                <select id='sort' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name"> name (A - Z) </option>
                    <option value="age"> age (oldest first) </option>
                    <option value="intake_date"> intake date (oldest first) </option>
                </select>
            </div>

            <div className='status-container'>
                <label htmlFor='status'>Filter by</label>
                <select id='status' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value='all'> all </option>
                    <option value='needsFeeding'> needs feeding </option>
                    <option value='needsCleaning'> needs cleaning </option>
                    <option value='needsCaring'> needs attention </option>
                </select>
            </div>

            <div className='tags-container'>
                <p> Filter By Tags </p>
                {tagOptions.map((tag) => {
                    return (
                        <div className='tag-item'>
                            <input id={tag} type='checkbox' checked={selectedTags.includes(tag)} onChange={() => toggleTagFilter(tag)} />
                            <label htmlFor={tag} key={tag}>{tag}</label>
                        </div>
                    )
                })}
            </div>

            <p> Results: {processedAnimals.length} </p>
            <button onClick={resetFilterButton} title='Reset'> <RiResetLeftFill size={18} /> </button>
        </div>

        <div className='needs-container'>
            <p> Feedings Left: {needsFeeding} </p>
            <p> Cleanings Left: {needsCleaning} </p>
            <p> Enrichments Left: {needsCaring} </p>
            <button onClick={() => setIsAddOpen(true)}> <IoAddSharp /> Add Animal </button>
        </div>
        <div className='animals-container'>
            {processedAnimals.length > 0 ? processedAnimals.map((animal) => {
                return (
                    <div key={animal.animal_id}>
                        <Link to={`/animals/${animal.animal_id}`}>
                        <div style={{backgroundImage: `url(${animal.image_url})`}}>
                            <h1> {animal.name} </h1>
                            <p> {animal.species} </p>
                            <p> {animal.weight} Pounds </p>
                            <p> {animal.age} Years Old </p>
                            <p> {animal.date_intake && new Date(animal.date_intake).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} </p>
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
                    <button command="show-modal" commandfor="delete-confirmation"><FaRegTrashAlt /> Delete</button>
                    <dialog id="delete-confirmation">Are you sure you'd like to delete an Animal from the Sanctuary? This action can NOT be undone. 
                        <button commandfor="delete-confirmation" command="close" >Close</button>
                        <button onClick={() => deleteAnimal(animal)} > DELETE </button>
                    </dialog>
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
