import { Router } from 'express'
import Page from '../mongoModels/Page'
import Section from '../mongoModels/Section'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const page = await Page.findById(id).populate('sections')
  res.json(page)
})

router.put('/sections', async (req, res) => {
  const sections = req.body
  try {
    await Promise.all(sections.map((s) => Section.findByIdAndUpdate(s._id, s)))
    res.status(200)
  } catch (err) {
    res.status(500)
  }
})

// router.post('/', async (req, res) => {
//   const page = await Page.create(req.body)
//   res.json(page)
// })


export default router
