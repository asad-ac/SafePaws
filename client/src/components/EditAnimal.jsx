import {useState, useEffect} from 'react'
import {toast} from 'react-hot-toast'
import '../css/EditAnimal.css'

const EditAnimal = (props) => {

  const [form, setForm] = useState({name: props.animal.name || "", description: props.animal.description || "", age: props.animal.age || "", weight: props.animal.weight || "", height: props.animal.height || "", image_url: props.animal.image_url || "", date_intake: props.animal.date_intake ? props.animal.date_intake.split('T')[0] : "", species: props.animal.species || "", cleaning_status: props.animal.cleaning_status || false, care_status: props.animal.care_status || false, feeding_status: props.animal.feeding_status || false, sanctuary_id: props.animal.sanctuary_id || 1})
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    const getTags = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tags`)
      const data = await response.json()
      setTags(data)
    }
    getTags()
  }, [])

  useEffect(() => {
    if (props.animal.tags) {
      setSelectedTags(props.animal.tags.map((tag) => Number(tag.tag_id)))
    }
  }, [props.animal])

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

    try {
      const updateAnimalPromise = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/animals/${props.animal.animal_id}`, options)
        
        if (!response.ok) {
          throw new Error("Update failed")
        }
        
        return await response.json()
      }

      const updatedAnimal = await toast.promise(updateAnimalPromise(), {
        loading: `Updating ${form.name}...`,
        success: `${form.name} updated`,
        error: `Failed to update ${form.name}`
      })
      
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

    catch (error) {
      console.error(error)
    }
  }

  const toggleTag = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  return (
    <div className="modal-overlay" onClick={() => props.setIsEditOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Animal</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" required type='text' name='name' value={form.name} onChange={handleChange} />
          <label htmlFor="description">Description</label>
          <textarea rows={3} id="description" name='description' value={form.description} onChange={handleChange}></textarea>
          <label htmlFor="age">Age</label>
          <input id="age" required type="text" name='age' value={form.age} onChange={handleChange} />
          <label htmlFor="weight">Weight</label>
          <input id="weight" required type="text" name='weight' value={form.weight} onChange={handleChange} />
          <label htmlFor="height">Height</label>
          <input id="height" required type="text" name='height' value={form.height} onChange={handleChange} />
          <label htmlFor="image_url">Image Link</label>
          <input id="image_url" required type="text" name='image_url' value={form.image_url} onChange={handleChange} />
          <label htmlFor="date_intake">Date Intake</label>
          <input id="date_intake" required type='date' name='date_intake' value={form.date_intake} onChange={handleChange} />
          <label htmlFor="species">Species</label>
          <input id="species" required type='text' name='species' value={form.species} onChange={handleChange} />
          <label htmlFor="feeding">Feeding Status</label>
          <select id="feeding" name='feeding_status' value={form.feeding_status} onChange={handleSelectChange}>
            <option value="false">Pending</option>
            <option value="true">Complete</option>
          </select>
          <label htmlFor="cleaning">Cleaning Status</label>
          <select id="cleaning" name='cleaning_status' value={form.cleaning_status} onChange={handleSelectChange}>
            <option value="false">Pending</option>
            <option value="true">Complete</option>
          </select>
          <label htmlFor="care">Care Status</label>
          <select id="care" name='care_status' value={form.care_status} onChange={handleSelectChange}>
            <option value="false">Pending</option>
            <option value="true">Complete</option>
          </select>
          <div className="modal-tags">
            <p>Select Tags</p>
            <div className="modal-tags-grid">
              {tags.map(tag => (
                <label className="modal-tag-item" htmlFor={`tag-${tag.tag_id}`} key={tag.tag_id}>
                  <input id={`tag-${tag.tag_id}`} type="checkbox" checked={selectedTags.includes(Number(tag.tag_id))} onChange={() => toggleTag(Number(tag.tag_id))} />
                  {tag.name}
                </label>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button type='button' onClick={() => props.setIsEditOpen(false)}>Cancel</button>
            <button type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditAnimal
