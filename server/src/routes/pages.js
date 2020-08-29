import { Router } from 'express'
import models from '../models'

import { authenticateToken } from '../middleware/authorization'

const router = Router()

router.get('/:title', async (req, res) => {
  try {
    const { title } = req.params
    const [page] = await models.pages.findAll({ where: { title } })
    const sections = await models.sections.findAll({ where: { page_id: page.id, is_trashed: 0 } })
    res.json({ page, sections })
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put('/section', authenticateToken, async (req, res) => {
  try {
    const { body } = req
    const section = await models.sections.findByPk(body.id)
    if (body.is_trashed) {
      section.is_trashed = 1
    } else {
      section.content = body.content
      section.secondary_content = body.secondary_content
      section.additional_info = body.additional_info
    }
    await section.save()
    res.send(200)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/section', authenticateToken, async (req, res) => {
  try {
    const { body } = req
    await models.sections.create({ ...body, is_trashed: 0 })
    res.send(200)
  } catch (err) {
    res.status(500).send(err)
  }
})
export default router
