import express from 'express'
import animalsController from "../controllers/animal.js"

const router = express.Router()

router.get('/', animalsController.getAllTestAnimals)

export default router