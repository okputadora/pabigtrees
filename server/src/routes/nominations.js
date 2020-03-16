import { Router } from 'express'
import multer from 'multer'
// import path from 'path'

import db from '../models'
import Nomination from '../mongoModels/Nomination'
import { nominationToTreeMap } from '../utils'

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
  try {
    const nominations = await Nomination.find({})
    res.json({ nominations })
  } catch (err) {
    res.json({ error: err })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const nomination = await Nomination.findById(req.params.id)
    res.json({ nomination })
  } catch (err) {
    res.json({ error: err })
  }
})

router.post('/upload', upload.array('photo', 5), async (req, res) => {
  if (req.fileValidationError) {
    return res.status(415).send({ message: req.fileValidationError })
  }
  return res.json(req.files.map(f => f.filename))
})

router.post('/', async (req, res) => {
  try {
    await Nomination.create(req.body)
    res.json({ success: true })
  } catch (err) {
    res.json({ error: err })
  }
})


// nomination approval
router.put('/approval/:id', async (req, res) => {
  try {
    const nomination = await Nomination.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    console.log({ nomination })
    // create new tree entry
    const tree = db.trees.build(nominationToTreeMap(nomination))
    // create tree images

    await tree.save()
    res.json({ success: true, tree })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

router.delete('/:imagePath', async (req, res) => {

})

export default router
