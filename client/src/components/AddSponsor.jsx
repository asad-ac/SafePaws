import {useState} from 'react'
import {IoAddSharp} from "react-icons/io5";

const AddSponsor = (props) => {

    const [form, setForm] = useState({name: '', amount: '', address: '', phone: '', email: '', sanctuary_id: 1})

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
            headßers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(form)
        }

        const response = await fetch('http://localhost:3001/sponsors', options)
        const newSponsor = await response.json()

        props.setSponsors((prev) => [...prev, newSponsor])
        props.setIsAddOpen(false)
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Name: </label>
        <input required type="text" name='name' value={form.name} onChange={handleChange} />
        <label> Amount: </label>
        <input required type="number" name='amount' value={form.amount} onChange={handleChange} />
        <label> Address: </label>
        <input required type="text" name='address' value={form.address} onChange={handleChange} />
        <label>Phone: </label>
        <input required type="tel" name='phone' value={form.phone} onChange={handleChange} />
        <label>Email: </label>
        <input required type="email" name='email' value={form.email} onChange={handleChange} />
        <button type="submit"> <IoAddSharp /> Add Sponsor</button>
      </form>
        <button type="button" onClick={() => props.setIsAddOpen(false)}> Cancel </button>
    </div>
  )
}

export default AddSponsor
