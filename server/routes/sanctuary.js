import express from 'express'
import sanctuaryController from '../controllers/sanctuary.js'

const router = express.Router()

router.get('/me', sanctuaryController.getSanctuary)
router.patch('/me', sanctuaryController.updateSanctuary)

export default router