import {useState, useEffect} from 'react'

const EditAnimal = (props) => {

  const [form, setForm] = useState({name: props.animal.name || "", description: props.animal.description || "", age: props.animal.age || "", weight: props.animal.weight || "", height: props.animal.height || "", image_url: props.animal.image_url || "", date_intake: props.animal.date_intake || "", species: props.animal.species || "", cleaning_status: props.animal.cleaning_status || "", care_status: props.animal.care_status || "", feeding_status: props.animal.feeding_status || "", sanctuary_id: props.animal.sanctuary_id || 1})
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    const getTags = async () => {
      const response = await fetch('http://localhost:3001/tags')
      const data = await response.json()
      setTags(data)
    }
    getTags()
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...form,
      age: Number(form.age),
      weight: Number(form.weight),
      height: Number(form.height),
      tag_ids: selectedTags
    }

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    const response = await fetch(`http://localhost:3001/animals/${props.animal.animal_id}`, options)
    const updatedAnimal = await response.json()

     // maps through animals to find animal we just edited, if it is update it otherwise keep same
    props.setAnimals((prev) =>
      prev.map((animal) =>
        animal.animal_id === updatedAnimal.animal_id ? updatedAnimal: animal))
    
    if (props.setAnimal) {
      props.setAnimal(updatedAnimal)
    }
    
    props.setIsEditOpen(false)
  }

  return (
    <div>
      
    </div>
  )
}

export default EditAnimal
