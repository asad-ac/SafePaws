import {useState} from 'react'
import {toast} from 'react-hot-toast'

const EditSponsor = (props) => {

  const [form, setForm] = useState({name: props.sponsor.name || '', amount: props.sponsor.amount || '', address: props.sponsor.address || '', phone: props.sponsor.phone || '', email: props.sponsor.email || '', sanctuary_id: props.sponsor.sanctuary_id || 1,})

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
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    }

    try {
      const updateSponsorPromise = async () => {
        const response = await fetch(`http://localhost:3001/sponsors/${props.sponsor.sponsor_id}`, options)

        if (!response.ok) {
          throw new Error("Update failed")
        }

        return await response.json()
      }

      const updatedSponsor = await toast.promise(updateSponsorPromise(), {
        loading: `Updating ${form.name}...`,
        success: `${form.name} updated`,
        error: `Failed to update ${form.name}`
      })
      
      // maps through sponsors to find sponsor we just edited, if it is update it otherwise keep same
      props.setSponsors((prev) =>
        prev.map((sponsor) =>
          sponsor.sponsor_id === updatedSponsor.sponsor_id ? updatedSponsor: sponsor))
      props.setIsEditOpen(false)
      }

      catch (error) {
        console.error(error)
      }
    }
    
   // TODO: add for, id, and autocomplete attributes

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input id="name" required type="text" name="name" value={form.name} onChange={handleChange} />
        <label htmlFor="amount"> Amount: </label>
        <input id="amount" required type="number" name="amount" value={form.amount} onChange={handleChange} />
        <label htmlFor="address"> Address: </label>
        <input id="address" required type="text" name="address" value={form.address} onChange={handleChange} />
        <label htmlFor="phone"> Phone: </label>
        <input id="phone" required type="tel" name="phone" value={form.phone} onChange={handleChange} />
        <label htmlFor="email"> Email: </label>
        <input id="email" required type="email" name="email" value={form.email} onChange={handleChange} />
        <button type="submit"> Save </button>
      </form>
      <button type="button" onClick={() => props.setIsEditOpen(false)}> Cancel </button>
    </div>
  )
}

export default EditSponsor
