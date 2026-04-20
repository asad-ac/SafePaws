import express from 'express'
import tagController from '../controllers/tag.js'

const router = express.Router()

router.get('/', tagController.getTags)

export default router