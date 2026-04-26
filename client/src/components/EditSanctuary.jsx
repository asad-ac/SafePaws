import {useState} from 'react'
import {toast} from 'react-hot-toast'

const EditSanctuary = (props) => {

    const [form, setForm] = useState({name: props.sanctuary.name || '', address: props.sanctuary.address || '', phone: props.sanctuary.phone || '', email: props.sanctuary.email || '', capacity: props.sanctuary.capacity || '', sanctuary_id: props.sanctuary.sanctuary_id || 1})

    const handleChange = (e) => {
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

        try {
          const updateSanctuaryPromise = async () => {
            const response = await fetch(`http://localhost:3001/sanctuaries/${form.sanctuary_id}`, options)
            
            if (!response.ok) {
              throw new Error("Update failed")
            }
            
            return await response.json()
          }
          
          const editedSanctuary = await toast.promise(updateSanctuaryPromise(), {
            loading: `Updating ${form.name}...`,
            success: `${form.name} updated`,
            error: `Failed to update ${form.name}`
          })
          
          props.setSanctuary(editedSanctuary)
          props.setIsEditOpen(false)

        }

        catch (error) {
          console.error(error)
        }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input id="name" onChange={handleChange} name='name' value={form.name} required type='text'  />
        <label htmlFor="address"> Address: </label>
        <input id="address" onChange={handleChange} name='address' value={form.address} required type='text' />
        <label htmlFor="phone"> Phone: </label>
        <input id="phone" onChange={handleChange} name='phone' value={form.phone} required type='tel' />
        <label htmlFor="email"> Email: </label>
        <input id="email" onChange={handleChange} name='email' value={form.email} required type='email' />
        <label htmlFor="capacity"> Capacity: </label>
        <input id="capacity" onChange={handleChange} name='capacity' value={form.capacity} required type='number' />
        <button type='submit'> Save </button>
      </form>
      <button type='button' onClick={() => props.setIsEditOpen(false)}> Cancel </button>
    </div>
  )
}

export default EditSanctuary
