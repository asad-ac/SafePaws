import express from 'express'
import animalsController from "../controllers/animal.js"

const router = express.Router()

router.get('/', animalsController.getAllTestAnimals)
// router.get('/', animalsController.getAllAnimals)
router.post('/:', volunteerController.createVolunteer)
router.patch('/:volunteer_id', volunteerController.updateVolunteer)
router.delete('/:volunteer_id', volunteerController.deleteVolunteer)

export default router