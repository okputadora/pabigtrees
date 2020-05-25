import { Router } from 'express'
import models from '../models'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const page = await models.pages.findByPK(id)
  res.json(page)
})

export default router
