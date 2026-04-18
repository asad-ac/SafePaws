import {useState} from 'react'

const AddSponsor = (props) => {

    const [form, setForm] = useState({name: '', amount: '', address: '', phone: '', email: '',})

    const handleChange = async (e) => {
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

        const response = await fetch('http://localhost:3001/sponsors')
        const newSponsor = response.json()

        setSponsors((prev) => [...prev, newSponsor])
        props.setIsAddOpen(false)
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Name: </label>
        <input required type="text" value={form.name} onChange={handleChange} />
        <label> Amount: </label>
        <input required type="text" value={form.amount} onChange={handleChange} />
        <label> Address: </label>
        <input required type="text" value={form.address} onChange={handleChange} />
        <label>Phone: </label>
        <input required type="number" value={form.phone} onChange={handleChange} />
        <label>Email: </label>
        <input required type="email" value={form.email} onChange={handleChange} />
      </form>
        <button onClick={() => props.setIsAddOpen(false)}> Cancel </button>
    </div>
  )
}

export default AddSponsor
