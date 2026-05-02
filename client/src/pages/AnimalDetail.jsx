import {useState, useEffect} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import {IoReturnDownBackOutline} from "react-icons/io5";
import {MdEdit} from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa";
import {toast} from 'react-hot-toast'

import EditAnimal from '../components/EditAnimal.jsx'
import NavBar from '../components/NavBar.jsx'
import HomeBar from '../components/HomeBar.jsx'
import Logout from '../components/Logout.jsx'
import SkeletonAnimalDetail from '../components/SkeletonAnimalDetail.jsx';
import '../css/AnimalDetail.css'

const AnimalDetail = () => {

    const {animal_id} = useParams()

    const navigate = useNavigate()

    const [animal, setAnimal] = useState({})
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAnimalById = async () => {
            try {
                setLoading(true)
                setError('')
    
                const response = await fetch(`http://localhost:3001/animals/${animal_id}`)
    
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`)
                }
    
                const data = await response.json()
                setAnimal(data)
    
            } catch (err) {
                console.error(err)
                setError(err.message || 'Something went wrong')
            } finally {
                setLoading(false)
            }
        }
    
        fetchAnimalById()
    }, [animal_id])

    const deleteAnimal = async () => {

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const deleteAnimalPromise = async () => {
                const response = await fetch(`http://localhost:3001/animals/${animal_id}`, options)
                
                if (!response.ok) {
                    throw new Error("Delete failed")
                }
                // dont need data back so not returning json
                return true
            }
            
            await toast.promise(deleteAnimalPromise(), {
                loading: `Deleting ${animal.name}...`,
                success: `${animal.name} deleted`,
                error: `Failed to delete ${animal.name}`
            })
            
            navigate('/animals')
        }

        catch (error) {
            console.error(error)
        }
    }

    function closeDialogOutside(e) {
        if (e.target === e.currentTarget) {
            e.currentTarget.close()
        }
    }

  return (
    <div>
        <HomeBar />
        <NavBar/>
        <Logout />
        <div className="detail-page">
            <div className="detail-header">
                <h1>View Animal</h1>
                <Link className="back-link" to='/animals'><IoReturnDownBackOutline /> Back</Link>
            </div>
            {loading ? (
                <SkeletonAnimalDetail />
            ) : error ? (
                <p>Error: {error}</p>
            ) : animal && animal.animal_id ? (
                <>
                    <div className="detail-card">
                        <img className="detail-image" src={animal.image_url} alt={`${animal.name} the ${animal.species}`} />
                        <div className="detail-info">
                            <div className="detail-field">
                                <span className="detail-label">Name</span>
                                <span className="detail-value">{animal.name}</span>
                            </div>
                            <div className="detail-field">
                                <span className="detail-label">Description</span>
                                <span className="detail-value">{animal.description}</span>
                            </div>
                            <div className="detail-field">
                                <span className="detail-label">Species</span>
                                <span className="detail-value">{animal.species}</span>
                            </div>
                            <div className="detail-field">
                                <span className="detail-label">Age</span>
                                <span className="detail-value">{animal.age} years old</span>
                            </div>
                            <div className="detail-field">
                                <span className="detail-label">Weight</span>
                                <span className="detail-value">{animal.weight} lbs</span>
                            </div>
                            <div className="detail-field">
                                <span className="detail-label">Height</span>
                                <span className="detail-value">{animal.height} ft</span>
                            </div>
                            <div className="detail-field">
                                <span className="detail-label">Intake</span>
                                <span className="detail-value">{animal.date_intake && new Date(animal.date_intake).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                            </div>
                            <div className="detail-status">
                                <div className="detail-status-item">
                                    <span className="detail-label">Feeding</span>
                                    <span className={`status-badge ${animal.feeding_status ? 'status-complete' : 'status-pending'}`}>{animal.feeding_status ? 'Complete' : 'Pending'}</span>
                                </div>
                                <div className="detail-status-item">
                                    <span className="detail-label">Cleaning</span>
                                    <span className={`status-badge ${animal.cleaning_status ? 'status-complete' : 'status-pending'}`}>{animal.cleaning_status ? 'Complete' : 'Pending'}</span>
                                </div>
                                <div className="detail-status-item">
                                    <span className="detail-label">Enrichment</span>
                                    <span className={`status-badge ${animal.care_status ? 'status-complete' : 'status-pending'}`}>{animal.care_status ? 'Complete' : 'Pending'}</span>
                                </div>
                            </div>
                            <div className="detail-actions">
                                <button className="edit-btn" onClick={() => setIsEditOpen(true)}><MdEdit /> Edit</button>
                                <button className="delete-btn" command="show-modal" commandfor="delete-confirmation"><FaRegTrashAlt /> Delete</button>
                                <dialog className="delete-dialog" id="delete-confirmation" onClick={closeDialogOutside}>
                                    Are you sure you'd like to delete this animal from the Sanctuary? This action cannot be undone.
                                    <div className="dialog-actions">
                                        <button commandfor="delete-confirmation" command="close">Close</button>
                                        <button onClick={deleteAnimal}>Delete</button>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </div>

                    {isEditOpen && <EditAnimal
                        animal={animal}
                        setIsEditOpen={setIsEditOpen}
                        setAnimal={setAnimal} />}

                    <div className="detail-tags">
                        <h3>Tags</h3>
                        <div className="tags-list">
                            {animal.tags && animal.tags.length > 0 && animal.tags.map((tag) => (
                                <span className="tag-pill" key={tag.tag_id}>{tag.name}</span>
                            ))}
                        </div>
                    </div>
                </>
            ) : <h1>No animal found</h1>}
        </div>
    </div>
  )
}

export default AnimalDetail