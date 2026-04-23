import {useState, useEffect} from 'react'

const EditAnimal = (props) => {

  const [form, setForm] = useState({name: props.animal.name || "", description: props.animal.description || "", age: props.animal.age || "", weight: props.animal.weight || "", height: props.animal.height || "", image_url: props.animal.image_url || "", date_intake: props.animal.date_intake || "", species: props.animal.species || "", cleaning_status: props.animal.cleaning_status || false, care_status: props.animal.care_status || false, feeding_status: props.animal.feeding_status || false, sanctuary_id: props.animal.sanctuary_id || 1})
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

  const handleSelectChange = (e) => {
    const {name, value} = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value === "true"
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
     if (props.setAnimals) {
      props.setAnimals((prev) =>
        prev.map((animal) =>
          animal.animal_id === updatedAnimal.animal_id ? updatedAnimal : animal
        )
      )
    }
    
    if (props.setAnimal) {
      props.setAnimal(updatedAnimal)
    }
    
    props.setIsEditOpen(false)
  }

  const toggleTag = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Name </label>
        <input required type='text' name='name' value={form.name} onChange={handleChange} />
        <label> Description </label>
        <textarea name='description' value={form.description} onChange={handleChange}></textarea>
        <label> Age </label>
        <input required type="text" name='age' value={form.age} onChange={handleChange} />
        <label> Weight </label>
        <input required type="number" name='weight' value={form.weight} onChange={handleChange} />
        <label> Height </label>
        <input required type="text" name='height' value={form.height} onChange={handleChange} />
        <label> Image Link </label>
        <input required type="text" name='image_url' value={form.image_url} onChange={handleChange} />
        <label> Date Intake </label>
        <input required type='date' name='date_intake' value={form.date_intake} onChange={handleChange} />
        <label> Species </label>
        <input required type='text' name='species' value={form.species} onChange={handleChange} />
              
        <label> Feeding Status </label>
        <select name='feeding_status' value={form.feeding_status} onChange={handleSelectChange}>
          <option value="false"> Pending </option>
          <option value="true"> Complete </option>
        </select>
        <label> Cleaning Status </label>
        <select name='cleaning_status' value={form.cleaning_status} onChange={handleSelectChange}>
            <option value="false"> Pending </option>
            <option value="true"> Complete </option>
        </select>
        <label> Care Status </label>
          <select name='care_status' value={form.care_status} onChange={handleSelectChange}>
            <option value="false"> Pending </option>
            <option value="true"> Comssplete </option>
        </select>
      
        <div>
          <h3> Select Tags </h3>
            {tags.map(tag => (
                <label key={tag.tag_id}>
                <input type="checkbox" checked={selectedTags.includes(tag.tag_id)} onChange={() => toggleTag(tag.tag_id)}/> {tag.name} </label>))}
        </div>
        <button type='submit'> Save </button>
    </form>
        <button type='button' onClick={() => props.setIsEditOpen(false)}> Cancel </button>
  </div>
  )
}

export default EditAnimal
