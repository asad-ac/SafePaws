import express from 'express'
import sponsorController from '../controllers/sponsor'

const router = express.Router()

router.get('/', sponsorController.getSponsor)
router.post('/:sponsor_id', sponsorController.createSponsor)
router.patch('/:sponsor_id', sponsorController.updateSponsor)
router.delete('/:sponsor_id', sponsorController.deleteSponsor)

export default router