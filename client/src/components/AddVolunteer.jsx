import {useState} from 'react'
import {IoAddSharp} from "react-icons/io5";
import {toast} from 'react-hot-toast'
import '../css/AddVolunteer.css'

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

        try {
          const addVolunteerPromise = async () => {
            const response = await fetch('http://localhost:3001/volunteers', options)
  
            if (!response.ok) {
              throw new Error("Add failed")
            }
  
            return await response.json()
          }
  
          const newVolunteer = await toast.promise(addVolunteerPromise(), {
            loading: `Adding ${form.name}...`,
            success: `${form.name} added`,
            error: `Failed to add ${form.name}`
          })
  
          props.setVolunteers((prev) => [...prev, newVolunteer])
          props.setIsAddOpen(false)
  
          setForm({name: '', address: '', phone: '', email: '', assigned_duty: '', sanctuary_id: 1})

        }

        catch (error) {
          console.error(error)
        }
    }
  
    return (
    <div className="modal-overlay" onClick={() => props.setIsAddOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Volunteer</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input placeholder="e.g. Alex Rivera" id="name" required type='text' name='name' value={form.name} onChange={handleChange} />
          <label htmlFor="address">Address</label>
          <input placeholder="e.g. 128 Coral Way, Miami, FL" id="address" required type='text' name='address' value={form.address} onChange={handleChange} />
          <label htmlFor="phone">Phone</label>
          <input placeholder="e.g. 786-213-4456" id="phone" required type='tel' name='phone' value={form.phone} onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input placeholder="e.g. alex.rivera@email.com" id="email" required type='email' name='email' value={form.email} onChange={handleChange} />
          <label htmlFor="assigned_duty">Assigned Duty</label>
          <textarea placeholder="e.g. Feeding and enclosure cleaning" rows={2} id="assigned_duty" required name='assigned_duty' value={form.assigned_duty} onChange={handleChange}></textarea>
          <div className="modal-actions">
            <button type='button' onClick={() => props.setIsAddOpen(false)}>Cancel</button>
            <button type='submit'><IoAddSharp /> Add Volunteer</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddVolunteer
