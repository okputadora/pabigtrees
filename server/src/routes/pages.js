import { Router } from 'express'
import { ObjectId } from 'mongoose'
import Page from '../mongoModels/Page'
import Section from '../mongoModels/Section'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const page = await Page.findById(id).populate('sections')
  res.json(page)
})

router.get('/ids', async (req, res) => {
  const sections = await Section.find({ page: ObjectId('5de12ed038a99e3154370d03') })
  res.json(sections.map(section => `ObjectId("${section._id}")`))
})

router.put('/sections', async (req, res) => {
  const sections = req.body
  try {
    await Promise.all(sections.map((s) => Section.findByIdAndUpdate(s._id, s)))
    res.json({ data: 'success' })
  } catch (err) {
    res.status(500)
  }
})

// router.post('/', async (req, res) => {
//   const page = await Page.create(req.body)
//   res.json(page)
// })


export default router
