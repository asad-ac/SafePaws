import {useState} from 'react'

const EditSanctuary = () => {

    const [form, setForm] = useState({name: '', address: '', phone: '', email: '', capacity: '', sanctuary_id: 1})

    const handleChange = () => {
        const {name, value} = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }

        const response = await fetch('http://localhost:3001/sanctuaries/1', options)
        const editedSanctuary = await response.json()

        props.setSanctuary(editedSanctuary)
        props.setIsEditOpen(false)
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Name: </label>
        <input onChange={handleChange} name='name' value={form.name} required type='text'  />
        <label> Address: </label>
        <input onChange={handleChange} name='address' value={form.address} required type='text' />
        <label> Phone: </label>
        <input onChange={handleChange} name='phone' value={form.phone} required type='tel' />
        <label> Email: </label>
        <input onChange={handleChange} name='email' value={form.email} required type='email' />
        <label> Capacity: </label>
        <input onChange={handleChange} name='capacity' value={form.capacity} required type='number' />
        <button type='submit'> Save </button>
      </form>
      <button type='button' onClick={() => props.setIsEditOpen(false)}> Cancel </button>
    </div>
  )
}

export default EditSanctuary
