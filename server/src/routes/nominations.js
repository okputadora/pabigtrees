import { Router } from 'express'
import multer from 'multer'
import fs from 'fs'
// import path from 'path'

import db from '../models'
import { formatAndValidateNomination, mapNominationToTree } from '../utils'

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

const moveToTreeImages = imagePaths => Promise.all(imagePaths.map(img => new Promise((resolve, reject) => {
  fs.rename(`uploads/${img.location}`, `treeImages/${img.location}`, (err) => {
    if (err) reject(err)
    else resolve()
  })
})))

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
    const nomination = await db.nominations.findOne({ where: { id: req.params.id } })
    const imagePaths = await db.nominationImages.findAll({ where: { nominationId: nomination.id } })
    res.json({ nomination, imagePaths })
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
    const formattedNomination = formatAndValidateNomination(req.body)
    console.log({ formattedNomination })
    db.nominations.create(formattedNomination).then(nom => (
      Promise.all(formattedNomination.imagePaths.map(
        img => db.nominationImages.create({
          location: img,
          nominationId: nom.toJSON().id,
        }),
      ))
    )).then(() => {
      res.json({ success: true })
    }).catch(e => {
      res.status(500).send(e)
    })
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

// nomination approval
router.put('/approval/:id', async (req, res) => {
  try {
    await db.nominations.update({ isApproved: true }, { where: { id: req.params.id } })
    const newTree = mapNominationToTree(req.body)
    const tree = await db.trees.create({ ...newTree, id: `TR${Date.now()}` })
    if (req.body.imagePaths && req.body.imagePaths.length > 0) {
      await Promise.all(req.body.imagePaths.map(img => db.treeImages.create({ k_tree: tree.id, img_location: img.location, f_active: 1 })))
      await moveToTreeImages(req.body.imagePaths)
    }
    res.json({ success: true, tree })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

router.delete('/:imagePath', async (req, res) => {

})

export default router
