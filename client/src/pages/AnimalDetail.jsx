import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {IoReturnDownBackOutline} from "react-icons/io5";
import {MdEdit} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";

const AnimalDetail = () => {

    const {animal_id} = useParams()

    const [animal, setAnimal] = useState({})

    useEffect(() => {
        const fetchAnimalById = async () => {
            const response = await fetch(`http://localhost:3001/animals/${animal_id}`)
            const data = await response.json()
            setAnimal(data)
        }
        fetchAnimalById()
    },[animal_id])

  return (
    <div>
        <h1> View Animal </h1>
        <Link to='/animals'> <IoReturnDownBackOutline /> Back </Link>
        <div>
            {animal && animal.animal_id ? (
                    <div>
                        <img src={animal.image_url} alt={`${animal.name} the ${animal.species}`} />
                        <h2> <strong> Name </strong> {animal.name} </h2>
                        <h2> <strong> Species </strong> {animal.species} </h2>
                        <h2> <strong> Age </strong> {animal.age} </h2>
                        <h2> <strong> Weight (pounds) </strong> {animal.weight} lbs </h2>
                        <h2> <strong> Height (feet) </strong> {animal.height} ft </h2>
                        <h2> <strong> Intake </strong> {" "}{animal.date_intake && new Date(animal.date_intake).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} </h2>

                        <div>
                            <h2> <strong> Feeding </strong> <span style={{backgroundColor: animal.feeding_status ? 'green' : 'red'}}> {animal.feeding_status ? 'Complete' : 'Pending'} </span> </h2>
                            <h2> <strong> Cleaning </strong> <span style={{backgroundColor: animal.cleaning_status ? 'green' : 'red'}}> {animal.cleaning_status ? 'Complete' : 'Pending'} </span> </h2>
                            <h2> <strong> Enrichment </strong> <span style={{backgroundColor: animal.care_status ? 'green' : 'red'}}> {animal.care_status ? 'Complete' : 'Pending'} </span> </h2>
                        </div>

                        <div>
                            <button> <MdEdit /> Edit </button>
                            <button> <FaRegTrashAlt /> Delete </button>
                        </div>

                        {animal.tags && animal.tags.length > 0 && animal.tags.map((tag) => (
                        <div key={tag.id}>
                            <p>{tag.name}</p>
                            <p>{tag.description}</p>
                        </div>
                        ))}
                    </div>
            ): <h1> No animal here </h1>}
        </div>
    </div>
  )
}

export default AnimalDetail
