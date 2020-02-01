import { Router } from 'express'

import Nomination from '../mongoModels/Nomination'

const router = Router()

// @TODO getting nominations should be restricted to admins
router.get('/', async (req, res) => {
  try {
    console.log('getting nominations')
    const nominations = await Nomination.find({})
    console.log(nominations)
    res.json({ nominations })
  } catch (err) {
    console.log({ err })
    res.json({ error: err })
  }
})

router.post('/', async (req, res) => {
  try {
    const nomination = await Nomination.create(req.body)
    console.log({ nomination })
    res.json({ success: true })
  } catch (err) {
    res.json({ error: err })
  }
})

export default router
