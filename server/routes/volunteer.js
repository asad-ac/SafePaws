import express from 'express'
import volunteerController from '../controllers/volunteer'

const router = express.Router()

router.get('/', volunteerController.getVolunteers)
router.post('/:volunteer_id', volunteerController.createVolunteer)
router.patch('/:volunteer_id', volunteerController.updateVolunteer)
router.delete('/:volunteer_id', volunteerController.deleteVolunteer)

export default router