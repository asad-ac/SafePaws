import {useState} from 'react'

const AddAnimal = () => {

    const [form, setForm] = useState({name: '', description: '', age: '', weight: '', height: '', image_url: '', date_intake: '', species: '', cleaning_status: '', care_status: '', feeding_status: '', sanctuary_id: 1})
    const [selectedTags, setSelectedTags] = useState([])

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }

        const response = await fetch(`http://localhost:3001/animals`, options)
        const data = await response.json()

    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Name </label>
        <input required type='text' name='name' value={form.name} onChange={handleChange} />
        <label> Age </label>
        <input required type="text" name='name' value={form.name} onChange={handleChange} />
        <label> Weight  </label>
        <input required type="number" name='amount' value={form.amount} onChange={handleChange} />
        <label> Height </label>
        <input required type="text" name='address' value={form.address} onChange={handleChange} />
        <label> Image Link  </label>
        <input required type="tel" name='phone' value={form.phone} onChange={handleChange} />
        <label> Date Intake  </label>
        <input required type="email" name='email' value={form.email} onChange={handleChange} />
        <label> Description </label>
        <textarea>  </textarea>
      </form>
    </div>
  )
}

export default AddAnimal
