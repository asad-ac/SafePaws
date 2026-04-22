import {useState, useEffect} from 'react'

const AddAnimal = () => {

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
          [name]: value === "true" // false === true: false, true === true: true
        }))
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...form, tag_ids: selectedTags})
        }

        const response = await fetch(`http://localhost:3001/animals`, options)
        const data = await response.json()

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
        <label> Name </label>
        <input required type='text' name='name' value={form.name} onChange={handleChange} />
        <label> Description </label>
        <textarea name='description' value={form.description} onChange={handleChange}></textarea>
        <label> Age </label>
        <input required type="text" name='age' value={form.age} onChange={handleChange} />
        <label> Weight  </label>
        <input required type="number" name='weight' value={form.weight} onChange={handleChange} />
        <label> Height </label>
        <input required type="text" name='height' value={form.height} onChange={handleChange} />
        <label> Image Link  </label>
        <input required type="text" name='image_url' value={form.image_url} onChange={handleChange} />
        <label> Date Intake  </label>
        <input required type='date' name='date_intake' value={form.date_intake} onChange={handleChange} />
        <label> Species </label>
        <input required type='text' name='species' value={form.species} onChange={handleChange} />

        <select name='feeding_status' value={form.feeding_status} onChange={handleSelectChange}>
            <option value="false"> Pending </option>
            <option value="true"> Complete </option>
        </select>
        <select name='cleaning_status' value={form.cleaning_status} onChange={handleSelectChange}>
            <option value="false"> Pending </option>
            <option value="true"> Complete </option>
        </select>
        <select name='care_status' value={form.care_status} onChange={handleSelectChange}>
            <option value="false"> Pending </option>
            <option value="true"> Complete </option>
        </select>

        <div>
            <h3> Select Tags </h3>
            {tags.map(tag => (
                <label key={tag.name} style={{ display: "block" }}>
                <input type="checkbox" checked={selectedTags.includes(tag.tag_id)} onChange={() => toggleTag(tag.tag_id)}/>
                {tag.name} </label>
            ))}
        </div>
      </form>
    </div>
  )
}

export default AddAnimal
