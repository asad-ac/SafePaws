import {useNavigate} from "react-router-dom"

const Logout = ({ setUser }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await fetch("http://localhost:3001/auth/logout", {
      method: "GET",
      credentials: "include"
    })

    setUser(null)
    navigate("/login")
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default Logout
