import { Router } from 'express'

import Nomination from '../mongoModels/Nomination'

const router = Router()

// @TODO getting nominations should be restricted to admins
router.get('/', async (req, res) => {
  try {
    const nominations = Nomination.findAll
    res.json({ nominations })
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/nominate', async (req, res) => {
  try {
    const nomination = await Nomination.create(req.body)
    console.log({ nomination })
    res.json({ success: true })
  } catch (err) {
    res.json({ error: err })
  }
})

export default router
