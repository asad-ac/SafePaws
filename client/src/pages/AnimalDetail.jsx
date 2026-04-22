import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {IoReturnDownBackOutline} from "react-icons/io5";

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
        {animal.length > 0 ? animal.map((a) => {
            <div>
                <img src={a.image_url} alt={`${a.name} the ${a.species}`} />
                <h2> <strong> Name </strong> {a.name} </h2>
                <h2> <strong> Species </strong> {a.species} </h2>
                <h2> <strong> Age </strong> {a.age} </h2>
                <h2> <strong> Weight (pounds) </strong> {a.weight} lbs </h2>
                <h2> <strong> Height (feet) </strong> {a.height} ft </h2>
                <h2> <strong> Intake </strong> {" "}{new Date(a.date_intake).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} </h2>

                <div>
                    <h2> <strong> Feeding </strong> <span style={{a.feeding_status ? backgroundColor: 'green' : backgroundColor: 'red'}}> {a.feeding_status ? 'Complete' : 'Pending'} </span> </h2>
                    <h2> <strong> Cleaning </strong> <span> {a.cleaning_status ? 'Complete' : 'Pending'} </span> </h2>
                    <h2> <strong> Enrichment </strong> <span> {a.care_status ? 'Complete' : 'Pending'} </span> </h2>
                </div>

            </div>
            }): <h1> No animal here </h1>}
        </div>
    </div>
  )
}

export default AnimalDetail
