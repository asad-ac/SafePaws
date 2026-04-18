import {useState} from 'react'

const EditVolunteer = (props) => {

    const [form, setForm] = useState({name: props.volunteer.name || '', address: props.volunteer.address || '', phone: props.volunteer.address || '', email: props.volunteer.email || '', assigned_duty: props.volunteer.assigned_duty || '', sanctuary_id: props.volunteer.sanctuary_id || 1,})

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]:value,
        }))
    }


    const handleSubmit = async () => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }

        const response = await fetch(`http://localhost:3001/volunteers/${props.volunteer.volunteer_id}`, options)
        const updatedVolunteer = await response.json()

        props.setVolunteers((prev) => 
            prev.map((volunteer) => 
                volunteer.volunteer_id === updatedVolunteer.volunteer_id ? updatedVolunteer : volunteer))
        props.setIsEditOpen(false)
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input required type='text' name='name' value={form.name} onChange={handleChange} />
        <label>Address:</label>
        <input required type='text' name='address' value={form.address} onChange={handleChange} />
        <label>Phone: </label>
        <input required type='text' name='phone' value={form.phone} onChange={handleChange} />
        <label>Email: </label>
        <input required type='email' name='email' value={form.email} onChange={handleChange} />
        <label>Assigned Duty:</label>
        <textarea required type='text' name='assigned_duty' value={form.assigned_duty} onChange={handleChange}></textarea>
        <button type='submit'> Save </button>
      </form>
      <button type='button' onClick={() => props.setIsEditOpen(false)}> Cancel </button>
    </div>
  )
}

export default EditVolunteer
