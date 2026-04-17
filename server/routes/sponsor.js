import express from 'express'
import sponsorController from '../controllers/sponsor.js'

const router = express.Router()

router.get('/', sponsorController.getSponsors)
router.post('/', sponsorController.createSponsor)
router.patch('/:sponsor_id', sponsorController.updateSponsor)
router.delete('/:sponsor_id', sponsorController.deleteSponsor)

export default router