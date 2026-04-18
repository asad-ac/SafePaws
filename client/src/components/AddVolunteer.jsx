import {useState} from 'react'

const AddVolunteer = (props) => {
    // boolean prop and setter state passed to add to array

    const [form, setForm] = useState({name: '', address: '', phone: '', email: '', assigned_duty: '', sanctuary_id: 1})

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }

        const response = await fetch('http://localhost:3001/sponsors', options)
        const newVolunteer = await response.json()

        props.setVolunteers((prev) => [...prev, newVolunteer])
        props.setIsAddOpen(false)
    }
  
    return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Name: </label>
        <input required type='text' name='name' value={form.name} onChange={handleChange} />
        <label> Address: </label>
        <input required type='address' name='address' value={form.address} onChange={handleChange} />
        <label> Phone: </label>
        <input required type='number' name='phone' value={form.phone} onChange={handleChange} />
        <label> Email: </label>
        <input required type='email' name='email' value={form.email} onChange={handleChange} />
        <label> Assigned Duty: </label>
        <textarea required name='assigned_duty' value={form.assigned_duty} onChange={handleChange}></textarea>
        <button type='submit'>+ Add Volunteer</button>
      </form>
      <button type='button' onClick={() => props.setIsAddOpen(false)}> Cancel</button>
    </div>
  )
}

export default AddVolunteer
