import { Router } from 'express'
import multer from 'multer'
// import path from 'path'

import db from '../models'
import Nomination from '../mongoModels/Nomination'
import { formatAndValidateNomination, nominationToTreeMap } from '../utils'

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
router.get('/', (req, res) => {
  const countyQuery = { model: db.counties }
  const speciesQuery = { model: db.species }
  const genusQuery = { model: db.genus }
  let nominations
  db.nominations.findAll({
    include: [
      countyQuery,
      genusQuery,
      speciesQuery,
    ],
  }).then(noms => {
    nominations = noms
    return Promise.all(noms.map(n => db.nominationImages.findAll({ where: { nominationId: n.id } })))
  }).then(nomImages => {
    const formattedNomImages = nomImages.map(imageArr => imageArr.map(image => image.dataValues.location))
    const nominationsWithImages = nominations.map((nom, i) => ({
      ...nom.toJSON(),
      imagePaths: formattedNomImages[i],
    }))
    res.json({ nominations: nominationsWithImages })
  }).catch(err => {
    res.status(500).json({ error: err })
  })
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
  try {
    const formattedNomination = formatAndValidateNomination(req.body)
    db.nominations.create(formattedNomination).then(nom => (Promise.all(formattedNomination.imagePaths.map(img => db.nominationImages.create({
      location: img,
      nominationId: nom.toJSON().id,
    }))))).then(() => {
      res.json({ success: true })
    }).catch(e => {
      res.status(500).send(e)
    })
  } catch (e) {
    res.status(400).send(e)
  }
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
