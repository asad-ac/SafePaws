import {useState, useEffect} from 'react'
import EditSanctuary from '../components/EditSanctuary.jsx'
import {MdEdit} from "react-icons/md";
import NavBar from '../components/Navbar.jsx';
import HomeBar from '../components/HomeBar.jsx';
import Logout from '../components/Logout.jsx';
import SkeletonSanctuary from '../components/SkeletonSanctuary.jsx';
import '../css/Sanctuary.css'

const Sanctuary = (props) => {

    const [sanctuary, setSanctuary] = useState(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSanctuary = async () => {
          try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/sanctuaries/1', {credentials: "include"});
            const data = await response.json();
            setSanctuary(data);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        getSanctuary();
      }, []);

  return (
    <>
        <NavBar />
        <HomeBar />
        <Logout setUser={props.setUser} />
        <div className="sanctuary-page">
        {loading ? (
            <SkeletonSanctuary />
        ) : sanctuary ? (
                <div className="sanctuary-card">
                    <h1 className="sanctuary-name">{sanctuary.name}</h1>
                    <p className="sanctuary-detail">{sanctuary.address}</p>
                    <p className="sanctuary-detail">{sanctuary.phone}</p>
                    <p className="sanctuary-detail">{sanctuary.email}</p>
                    <p className="sanctuary-detail">{sanctuary.capacity}</p>
                    <button className="sanctuary-edit-btn" onClick={() => setIsEditOpen(true)}>
                        <MdEdit /> Edit Sanctuary
                    </button>
                </div>
            ) : <h1 className="sanctuary-empty">No sanctuary yet</h1>}
        </div>

        {isEditOpen && sanctuary && (
        <EditSanctuary
            sanctuary={sanctuary}
            setSanctuary={setSanctuary}
            setIsEditOpen={setIsEditOpen}/>)}
    </>
  )
}

export default Sanctuary