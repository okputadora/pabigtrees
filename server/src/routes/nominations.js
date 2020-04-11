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

router.post('/', (req, res) => {
  // validate and format nomination
  const formattedNomination = {
    ...req.body, speciesId: req.body.species, genusId: req.body.genus,
  }
  delete formattedNomination.species
  delete formattedNomination.genus
  delete formattedNomination.commonName
  db.nominations.create(formattedNomination).then(() => {
    res.json({ success: true })
  }).catch(e => {
    res.json({ error: err })
  })
})


// nomination approval
router.put('/approval/:id', async (req, res) => {
  try {
    // const nomination = await Nomination.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    // console.log({ nomination })
    // create new tree entry
    // look up species and and genus ids ... if they dont exist create a new one
    const { species, genus } = req.body
    console.log(species, genus)
    const spec = await db.species.findAll({ where: { t_species: species.toLowerCase() }, include: { model: db.genus } })
    if (spec.length === 0) {
      // we have to create a new species
    }

    // format nomination
    // const tree = db.trees.build(nominationToTreeMap(nomination))
    // create tree images
    // tree.points = 600
    // tree.id = `TR${Date.now()}` // not a great way to generate ids I know but this matches the dataset we inherited
    // await tree.save()
    res.json({ success: true, spec })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

router.delete('/:imagePath', async (req, res) => {

})

export default router
