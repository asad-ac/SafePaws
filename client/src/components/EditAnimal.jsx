import {useState} from 'react'

const EditAnimal = (props) => {

  const [form, setForm] = useState({name: props.animal.name || "", })

  return (
    <div>
      
    </div>
  )
}

export default EditAnimal
