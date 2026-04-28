import {useState} from 'react'
import {IoAddSharp} from "react-icons/io5";
import {toast} from 'react-hot-toast'
import '../css/AddSponsor.css'

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
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(form)
        }

        try {
          const addSponsorPromise = async () => {
            const response = await fetch('http://localhost:3001/sponsors', options)
  
            if (!response.ok) {
              throw new Error("Add failed")
            }
  
            return await response.json()
          }
  
          const newSponsor = await toast.promise(addSponsorPromise(), {
            loading: `Adding ${form.name}...`,
            success: `${form.name} added`,
            error: `Failed to add ${form.name}`
          })
  
          props.setSponsors((prev) => [...prev, newSponsor])
          props.setIsAddOpen(false)
  
          setForm({name: '', amount: '', address: '', phone: '', email: '', sanctuary_id: 1})

        }

        catch (error) {
          console.error(error)
        }
    }

  return (
    <div className="modal-overlay" onClick={() => props.setIsAddOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Sponsor</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input placeholder="e.g. Wildlife Rescue Fund" id="name" required type="text" name='name' value={form.name} onChange={handleChange} />
          <label htmlFor="amount">Amount</label>
          <input placeholder="e.g. 500.00" id="amount" required type="number" name='amount' value={form.amount} onChange={handleChange} />
          <label htmlFor="address">Address</label>
          <input placeholder="e.g. 210 Ocean Dr, Miami, FL" id="address" required type="text" name='address' value={form.address} onChange={handleChange} />
          <label htmlFor="phone">Phone</label>
          <input placeholder="e.g. 305-482-9172" id="phone" required type="tel" name='phone' value={form.phone} onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input placeholder="e.g. contact@wildliferescue.org" id="email" required type="email" name='email' value={form.email} onChange={handleChange} />
          <div className="modal-actions">
            <button type="button" onClick={() => props.setIsAddOpen(false)}>Cancel</button>
            <button type="submit"><IoAddSharp /> Add Sponsor</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSponsor
