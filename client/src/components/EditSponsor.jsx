import {useState} from 'react'

const EditSponsor = (props) => {

  const [form, setForm] = useState({name: props.sponsor.name || '', amount: props.sponsor.amount || '', address: props.sponsor.address || '', phone: props.sponsor.phone || '', email: props.sponsor.email || '', sanctuary_id: props.sponsor.sanctuary_id || 1,})

  const handleChange = () => {
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

    const response = await fetch(`http://localhost:3001/sponsors/${props.sponsor.sponsor_id}`, options)
    const updatedSponsor = await response.json()

    // maps through sponsors to find sponsor we just edited, if it is update it otherwise keep same
    props.setSponsors((prev) =>
      prev.map((sponsor) =>
        sponsor.sponsor_id === updatedSponsor.sponsor_id ? updatedSponsor: sponsor))
    props.setIsEditOpen(false)
  }

   // TODO: add for, id, and autocomplete attributes

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Name: </label>
        <input required type="text" name="name" value={form.name} onChange={handleChange} />
        <label> Amount: </label>
        <input required type="number" name="amount" value={form.amount} onChange={handleChange} />
        <label> Address: </label>
        <input required type="text" name="address" value={form.address} onChange={handleChange} />
        <label> Phone: </label>
        <input required type="tel" name="phone" value={form.phone} onChange={handleChange} />
        <label> Email: </label>
        <input required type="email" name="email" value={form.email} onChange={handleChange} />
        <button type="submit"> Save </button>
      </form>
      <button type="button" onClick={() => props.setIsEditOpen(false)}>Cancel </button>
    </div>
  )
}

export default EditSponsor
