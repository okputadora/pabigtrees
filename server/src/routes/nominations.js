import { Router } from 'express'
import multer from 'multer'
// import path from 'path'

import Nomination from '../mongoModels/Nomination'

const router = Router()
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename(req, file, cb) {
    console.log(file)

    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const imageFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = 'Only image files are allowed!'
    // return cb('Only image files are allowed!', false)
  }
  return cb(null, true)
}
exports.imageFilter = imageFilter
const upload = multer({ storage, fileFilter: imageFilter })

// @TODO getting nominations should be restricted to admins
router.get('/', async (req, res) => {
  console.log('in the wrong route?')
  try {
    const nominations = await Nomination.find({})
    res.json({ nominations })
  } catch (err) {
    res.json({ error: err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    console.log('fetching')
    console.log(req.params.id)
    const nomination = await Nomination.findById(req.params.id)
    console.log(nomination)
    res.json({ nomination })
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/upload', upload.array('photo', 5), async (req, res) => {
  if (req.fileValidationError) {
    console.log('returning validation error!')
    return res.status(415).send({ message: req.fileValidationError })
  }
  return res.json(req.files.map(f => f.filename))
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
