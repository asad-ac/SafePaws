import express from 'express'
import sanctuaryController from '../controllers/sanctuary'

const router = express.Router()

router.get('/',sanctuaryController.getSanctuary)
router.get('/:sanctuary_id')





export default router