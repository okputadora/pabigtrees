import { Router } from 'express'

import models from '../models'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const news = await models.news.findAll({ order: [['create_date', 'DESC']] })
    res.json({ news })
  } catch (err) {
    console.log({ err })
    res.status(500).json({ err })
  }
})

export default router
