import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

const AnimalDetail = () => {

    const {animal_id} = useParams()

    const [animal, setAnimal] = useState([])

    useEffect(() => {
        const fetchAnimalById = async () => {
            const response = await fetch(`http://localhost:3001/animals/${animal_id}`)
            const data = await response.json()
            setAnimal(data)
        }
    },[animal_id])

  return (
    <div>
      
    </div>
  )
}

export default AnimalDetail
