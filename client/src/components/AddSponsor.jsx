import {useState} from 'react'

const AddSponsor = (props) => {

    const [addSponsor, setAddSponsor] = useState([])

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(addSponsor)
    }
    
    const add = async () => {
        const insert = await fetch('http://localhost:3001/sponsors', options)
    }   

  return (
    <div>
      <form onSubmit={add}>
        <label> Name: </label>
        <input required type="text" />
        <label> Amount: </label>
        <input required type="text" />
        <label> Address: </label>
        <input required type="text" />
        <label>Phone: </label>
        <input required type="number" />
        <label>Email: </label>
        <input required type="email" />
      </form>
      <button onClick={add}> Submit </button>
        <button> Cancel </button>
    </div>
  )
}

export default AddSponsor
