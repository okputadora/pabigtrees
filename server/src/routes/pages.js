import { Router } from 'express'
import models from '../models'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const page = await models.pages.findByPk(id)
  const sections = await models.sections.findAll({ where: { page_id: id } })
  res.json({ page, sections })
})

export default router
