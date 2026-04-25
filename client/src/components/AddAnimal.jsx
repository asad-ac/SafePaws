import {useState, useEffect} from 'react'
import {IoAddSharp} from "react-icons/io5";

const AddAnimal = (props) => {

    // TODO: fetch tags
    // TODO: selected tags
    // TODO: fix handlesubmit with spread
    // TODO: cleaning status, care status, feeding status
    // TODO: pass props?

    const [form, setForm] = useState({name: '', description: '', age: '', weight: '', height: '', image_url: '', date_intake: '', species: '', cleaning_status: false, care_status: false, feeding_status: false, sanctuary_id: 1})
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        const getTags = async () => {
            const response = await fetch('http://localhost:3001/tags')
            const data = await response.json()
            setTags(data)
        }
        getTags()
    },[])

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        const response = await fetch(`http://localhost:3001/animals`, options)
        const newAnimal = await response.json()

        props.setAnimals(prev => [...prev, newAnimal])
        props.setIsAddOpen(false)

        setForm({name: '', description: '', age: '', weight: '', height: '', image_url: '', date_intake: '', species: '', cleaning_status: false, care_status: false, feeding_status: false, sanctuary_id: 1})
          
        setSelectedTags([])
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
        <label htmlFor='name'> Name: </label>
        <input id='name' required type='text' name='name' value={form.name} onChange={handleChange} />
        <label htmlFor='description'> Description: </label>
        <textarea style={{resize: 'none'}} rows={3} id='description' name='description' value={form.description} onChange={handleChange}></textarea>
        <label htmlFor='age'> Age: </label>
        <input id='age' required type="text" name='age' value={form.age} onChange={handleChange} />
        <label htmlFor='weight'> Weight: </label>
        <input id='weight' required type="number" name='weight' value={form.weight} onChange={handleChange} />
        <label htmlFor='height'> Height: </label>
        <input id='height' required type="text" name='height' value={form.height} onChange={handleChange} />
        <label htmlFor='image_url'> Image Link: </label>
        <input id='image_url' required type="text" name='image_url' value={form.image_url} onChange={handleChange} />
        <label htmlFor='date_intake'> Date Intake: </label>
        <input id='date_intake' required type='date' name='date_intake' value={form.date_intake} onChange={handleChange} />
        <label htmlFor='species'> Species: </label>
        <input id='species' required type='text' name='species' value={form.species} onChange={handleChange} />
        
        <label htmlFor='feeding'> Feeding Status: </label>
        <select id='feeding' name='feeding_status' value={form.feeding_status} onChange={handleSelectChange}>
            <option value="false"> Pending </option>
            <option value="true"> Complete </option>
        </select>
        <label htmlFor='cleaning'> Cleaning Status: </label>
        <select id='cleaning' name='cleaning_status' value={form.cleaning_status} onChange={handleSelectChange}>
            <option value="false"> Pending </option>
            <option value="true"> Complete </option>
        </select>
        <label htmlFor='care'> Care Status: </label>
        <select id='care' name='care_status' value={form.care_status} onChange={handleSelectChange}>
            <option value="false"> Pending </option>
            <option value="true"> Complete </option>
        </select>

        <div>
            <h3> Select Tags: </h3>
            {tags.map(tag => (
                <label htmlFor={`tag-${tag.tag_id}`} key={tag.tag_id}>
                <input id={`tag-${tag.tag_id}`} type="checkbox" checked={selectedTags.includes(tag.tag_id)} onChange={() => toggleTag(tag.tag_id)}/> {tag.name} </label>))}
        </div>
        <button type='submit'> <IoAddSharp /> Add Animal </button>
      </form>
      <button type='button' onClick={() => props.setIsAddOpen(false)}> Cancel </button>
    </div>
  )
}

export default AddAnimal
