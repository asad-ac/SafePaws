import express from 'express'
import sanctuaryController from '../controllers/sanctuary.js'

const router = express.Router()

router.get('/:sanctuary_id', sanctuaryController.getSanctuary)
router.patch('/:sanctuary_id', sanctuaryController.updateSanctuary)

export default router