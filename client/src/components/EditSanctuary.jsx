import {useState} from 'react'

const EditSanctuary = () => {

    const [form, setForm] = useState({name: '', address: '', phone: '', email: '', capacity: '', sanctuary_id: 1})

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

        const response = await fetch('http://localhost:3001/sanctuaries/1', options)
        const editedSanctuary = await response.json()

        props.setSanctuary(editedSanctuary)
        props.setIsEditOpen(false)
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label></label>
        <input onChange={handleChange} name='' value={} required type=''  />
        <label></label>
        <input onChange={handleChange} name='' value={} required type='' />
        <label></label>
        <input onChange={handleChange} name='' value={} required type='' />
        <label></label>
        <input onChange={handleChange} name='' value={} required type='' />
        <label></label>
        <input onChange={handleChange} name='' value={} required type='' />
      </form>
    </div>
  )
}

export default EditSanctuary
