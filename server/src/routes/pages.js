import { Router } from 'express'
import multer from 'multer'

import models from '../models'
import { authenticateToken } from '../middleware/authorization'

const router = Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'pagesUploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

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

// @TODO extract to util function and share between trees and nomination
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = 'Only image files are allowed!'
  }
  return cb(null, true)
}
exports.imageFilter = imageFilter
const upload = multer({ storage, fileFilter: imageFilter })

router.post('/upload', authenticateToken, upload.array('photo', 1), async (req, res) => {
  if (req.fileValidationError) {
    return res.status(415).send({ message: req.fileValidationError })
  }
  // @TODO all file mapping should include that path...right now its being hard coded on the FE
  return res.json(req.files.map(f => `pagesUploads/${f.filename}`))
})

export default router
