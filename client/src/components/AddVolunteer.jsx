import {useState} from 'react'
import {IoAddSharp} from "react-icons/io5";

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

        const response = await fetch('http://localhost:3001/volunteers', options)
        const newVolunteer = await response.json()

        props.setVolunteers((prev) => [...prev, newVolunteer])
        props.setIsAddOpen(false)

        setForm({name: '', address: '', phone: '', email: '', assigned_duty: '', sanctuary_id: 1})
    }
  
    return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input id="name" required type='text' name='name' value={form.name} onChange={handleChange} />
        <label htmlFor="address"> Address: </label>
        <input id="address" required type='text' name='address' value={form.address} onChange={handleChange} />
        <label htmlFor="phone"> Phone: </label>
        <input id="phone" required type='tel' name='phone' value={form.phone} onChange={handleChange} />
        <label htmlFor="email"> Email: </label>
        <input id="email" required type='email' name='email' value={form.email} onChange={handleChange} />
        <label htmlFor="assigned_duty"> Assigned Duty: </label>
        <textarea rows={2} style={{resize: 'none'}} required name='assigned_duty' value={form.assigned_duty} onChange={handleChange}></textarea>
        <button type='submit'> <IoAddSharp /> Add Volunteer </button>
      </form>
      <button type='button' onClick={() => props.setIsAddOpen(false)}> Cancel</button>
    </div>
  )
}

export default AddVolunteer
