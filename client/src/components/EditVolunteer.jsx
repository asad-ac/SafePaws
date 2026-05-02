import {useState} from 'react'
import {toast} from 'react-hot-toast'
import '../css/EditVolunteer.css'

const EditVolunteer = (props) => {

    const [form, setForm] = useState({name: props.volunteer.name || '', address: props.volunteer.address || '', phone: props.volunteer.phone || '', email: props.volunteer.email || '', assigned_duty: props.volunteer.assigned_duty || '', sanctuary_id: props.volunteer.sanctuary_id || 1,})

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]:value,
        }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(form)
        }

        try {
          const updateVolunteerPromise = async () => {
            const response = await fetch(`http://localhost:3001/volunteers/${props.volunteer.volunteer_id}`, options)
            
            if (!response.ok) {
              throw new Error("Update failed")
            }
            
            return await response.json()
          }

          const updatedVolunteer = await toast.promise(updateVolunteerPromise(), {
            loading: `Updating ${form.name}...`,
            success: `${form.name} updated`,
            error: `Failed to update ${form.name}`
          })
          
          props.setVolunteers((prev) => 
            prev.map((volunteer) => 
              volunteer.volunteer_id === updatedVolunteer.volunteer_id ? updatedVolunteer : volunteer))
          props.setIsEditOpen(false)
        }

        catch (error) {
          console.error(error)
        } 
    }

  return (
    <div className="modal-overlay" onClick={() => props.setIsEditOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation(e)}>
        <h2>Edit Volunteer: {props.volunteer.name}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" required type='text' name='name' value={form.name} onChange={handleChange} />
          <label htmlFor="address">Address</label>
          <input id="address" required type='text' name='address' value={form.address} onChange={handleChange} />
          <label htmlFor="phone">Phone</label>
          <input id="phone" required type='tel' name='phone' value={form.phone} onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input id="email" required type='email' name='email' value={form.email} onChange={handleChange} />
          <label htmlFor="assigned_duty">Assigned Duty</label>
          <textarea rows={2} id="assigned_duty" required name='assigned_duty' value={form.assigned_duty} onChange={handleChange}></textarea>
          <div className="modal-actions">
            <button type='button' onClick={() => props.setIsEditOpen(false)}>Cancel</button>
            <button type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditVolunteer