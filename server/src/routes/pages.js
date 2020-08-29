import { Router } from 'express'
import models from '../models'

import { authenticateToken } from '../middleware/authorization'

const router = Router()

router.get('/:title', async (req, res) => {
  try {
    const { title } = req.params
    const [page] = await models.pages.findAll({ where: { title } })
    const sections = await models.sections.findAll({ where: { page_id: page.id } })
    res.json({ page, sections })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

router.put('/sections', authenticateToken, async (req, res) => {
  try {
    const { body } = req
    console.log({ body })
    const section = await models.sections.findByPk(body.id)
    section.content = body.content
    section.secondary_content = body.secondary_content
    await section.save()
    res.send(200)
  } catch (err) {
    res.status(500).send(err)
  }
})

export default router
