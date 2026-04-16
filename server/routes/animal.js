import express from 'express'
import animalsController from "../controllers/animal.js"

const router = express.Router()

router.get('/', animalsController.getAllAnimals)
router.get('/:animal_id', animalsController.getAnimalById)
router.post('/', animalsController.createAnimal)
router.patch('/:animal_id', animalsController.updateAnimal)
router.delete('/:animal_id', animalsController.deleteAnimal)

export default router